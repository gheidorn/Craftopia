const craftingSessionModel = require('../models/craftingSession.model');
const bankService = require('./bank.service');
const pool = require('../config/database');

// Get all components with details
const getAllComponents = async (category = null) => {
  let query = `
    SELECT
      c.id,
      c.name,
      c.category,
      c.rarity_id,
      c.base_material_id,
      c.base_material_quantity,
      c.processing_time,
      m.name as base_material_name,
      m.category as base_material_category
    FROM components c
    JOIN materials m ON c.base_material_id = m.id
  `;

  const params = [];

  if (category) {
    query += ' WHERE c.category = $1';
    params.push(category);
  }

  query += ' ORDER BY c.category, c.rarity_id';

  const result = await pool.query(query, params);
  return result.rows;
};

// Get component details with requirements
const getComponentDetails = async (componentId, userId = null) => {
  // Get component info
  const componentQuery = `
    SELECT
      c.id,
      c.name,
      c.category,
      c.rarity_id,
      c.base_material_id,
      c.base_material_quantity,
      c.processing_time,
      m.name as base_material_name,
      m.category as base_material_category
    FROM components c
    JOIN materials m ON c.base_material_id = m.id
    WHERE c.id = $1
  `;

  const componentResult = await pool.query(componentQuery, [componentId]);

  if (componentResult.rows.length === 0) {
    throw new Error('Component not found');
  }

  const component = componentResult.rows[0];

  // Get requirements (tools and consumables)
  const requirementsQuery = `
    SELECT
      requirement_type,
      requirement_name,
      quantity
    FROM component_requirements
    WHERE component_id = $1
    ORDER BY requirement_type, requirement_name
  `;

  const requirementsResult = await pool.query(requirementsQuery, [componentId]);

  const requirements = {
    materials: [
      {
        id: component.base_material_id,
        name: component.base_material_name,
        quantity: component.base_material_quantity,
      },
    ],
    tools: requirementsResult.rows
      .filter((r) => r.requirement_type === 'tool')
      .map((r) => ({ name: r.requirement_name, quantity: r.quantity })),
    consumables: requirementsResult.rows
      .filter((r) => r.requirement_type === 'consumable')
      .map((r) => ({ name: r.requirement_name, quantity: r.quantity })),
  };

  let canCraft = false;
  let missing = [];

  // Check if user can craft (if userId provided)
  if (userId) {
    const craftCheck = await bankService.canCraftComponent(userId, componentId);
    canCraft = craftCheck.canCraft;
    missing = craftCheck.missing;
  }

  return {
    component,
    requirements,
    canCraft,
    missing,
  };
};

// Start crafting a component
const startCrafting = async (userId, componentId) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Get component details
    const componentQuery = `
      SELECT * FROM components WHERE id = $1
    `;
    const componentResult = await client.query(componentQuery, [componentId]);

    if (componentResult.rows.length === 0) {
      throw new Error('Component not found');
    }

    const component = componentResult.rows[0];

    // Check if user can craft
    const craftCheck = await bankService.canCraftComponent(userId, componentId);

    if (!craftCheck.canCraft) {
      throw new Error(`Missing requirements: ${craftCheck.missing.map(m => `${m.name} (need ${m.required}, have ${m.current})`).join(', ')}`);
    }

    // Build items to remove from bank
    const itemsToRemove = [];

    // Add base material
    itemsToRemove.push({
      type: 'material',
      id: component.base_material_id,
      quantity: component.base_material_quantity,
    });

    // Get requirements and add consumables (tools are not consumed)
    const requirementsQuery = `
      SELECT requirement_type, requirement_name, quantity
      FROM component_requirements
      WHERE component_id = $1 AND requirement_type = 'consumable'
    `;

    const requirementsResult = await client.query(requirementsQuery, [componentId]);

    for (const req of requirementsResult.rows) {
      const consumableQuery = `SELECT id FROM consumables WHERE name = $1`;
      const consumableResult = await client.query(consumableQuery, [req.requirement_name]);

      if (consumableResult.rows.length > 0) {
        itemsToRemove.push({
          type: 'consumable',
          id: consumableResult.rows[0].id,
          quantity: req.quantity,
          name: req.requirement_name,
        });
      }
    }

    // Remove items from bank
    await bankService.removeItemsFromBank(userId, itemsToRemove);

    // Create crafting session
    const session = await craftingSessionModel.createSession(
      userId,
      componentId,
      component.processing_time
    );

    await client.query('COMMIT');

    return session;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Get active crafting sessions with status check
const getActiveSessions = async (userId) => {
  const sessions = await craftingSessionModel.getActiveSessions(userId);

  // Check each session and update if ready
  const updatedSessions = await Promise.all(
    sessions.map(async (session) => {
      if (session.status === 'active' && craftingSessionModel.isSessionReady(session)) {
        await craftingSessionModel.markSessionReady(session.id);
        session.status = 'ready';
      }

      // Calculate time remaining
      const now = new Date();
      const readyAt = new Date(session.ready_at);
      const timeRemaining = Math.max(0, Math.floor((readyAt - now) / 1000));

      return {
        ...session,
        timeRemaining,
      };
    })
  );

  return updatedSessions;
};

// Collect component from a ready session
const collectCrafting = async (userId, sessionId) => {
  const session = await craftingSessionModel.getSessionById(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.user_id !== userId) {
    throw new Error('This is not your crafting session');
  }

  if (session.status === 'collected') {
    throw new Error('Session already collected');
  }

  if (session.status === 'cancelled') {
    throw new Error('Session was cancelled');
  }

  // If active but ready, mark as ready
  if (session.status === 'active') {
    if (!craftingSessionModel.isSessionReady(session)) {
      throw new Error('Session is not ready yet');
    }
    await craftingSessionModel.markSessionReady(sessionId);
  }

  if (session.status !== 'ready') {
    throw new Error('Session is not ready to collect');
  }

  // Add component to bank
  await bankService.addItemsToBank(userId, [
    {
      type: 'component',
      id: session.component_id,
      quantity: session.result_quantity,
    },
  ]);

  // Mark as collected
  await craftingSessionModel.markSessionCollected(sessionId);

  // Get component details
  const componentQuery = `
    SELECT * FROM components WHERE id = $1
  `;
  const componentResult = await pool.query(componentQuery, [session.component_id]);

  return {
    component: componentResult.rows[0],
    quantity: session.result_quantity,
  };
};

// Cancel crafting session (no refund)
const cancelCrafting = async (userId, sessionId) => {
  const session = await craftingSessionModel.getSessionById(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.user_id !== userId) {
    throw new Error('This is not your crafting session');
  }

  if (session.status === 'collected') {
    throw new Error('Cannot cancel a collected session');
  }

  if (session.status === 'cancelled') {
    throw new Error('Session already cancelled');
  }

  await craftingSessionModel.cancelSession(sessionId);

  return { message: 'Crafting session cancelled (materials not refunded)' };
};

// Get crafting history
const getCraftingHistory = async (userId, limit = 10, offset = 0) => {
  const sessions = await craftingSessionModel.getSessionHistory(userId, limit, offset);
  const total = await craftingSessionModel.getSessionCount(userId);

  return {
    sessions,
    total,
  };
};

module.exports = {
  getAllComponents,
  getComponentDetails,
  startCrafting,
  getActiveSessions,
  collectCrafting,
  cancelCrafting,
  getCraftingHistory,
};

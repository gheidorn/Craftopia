const farmingSessionModel = require('../models/farmingSession.model');
const rarityService = require('./rarity.service');
const bankService = require('./bank.service');

// Start a farming session
const startFarming = async (userId, materialCategory, durationMinutes) => {
  // Check if user already has an active session
  const existingSession = await farmingSessionModel.getActiveSession(userId);

  if (existingSession) {
    throw new Error('You already have an active farming session');
  }

  // Validate category
  const validCategories = ['wood', 'metal', 'fish', 'herb'];
  if (!validCategories.includes(materialCategory)) {
    throw new Error('Invalid material category');
  }

  // Validate duration (1-60 minutes)
  if (durationMinutes < 1 || durationMinutes > 60) {
    throw new Error('Duration must be between 1 and 60 minutes');
  }

  const durationSeconds = durationMinutes * 60;

  // Create session
  const session = await farmingSessionModel.createSession(
    userId,
    materialCategory,
    durationSeconds
  );

  return session;
};

// Check session status and roll for materials if ready
const checkSession = async (sessionId) => {
  const session = await farmingSessionModel.getSessionById(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  // If already ready or collected, return as-is
  if (session.status === 'ready' || session.status === 'collected') {
    return session;
  }

  // If active and ready time has passed, roll for materials
  if (session.status === 'active' && farmingSessionModel.isSessionReady(session)) {
    const durationMinutes = Math.floor(session.duration_seconds / 60);
    const result = await rarityService.rollMaterial(session.material_category, durationMinutes);

    const updatedSession = await farmingSessionModel.updateSessionReady(
      sessionId,
      result.material.id,
      result.quantity
    );

    return {
      ...updatedSession,
      material: result.material,
    };
  }

  return session;
};

// Get active session with status check
const getActiveSession = async (userId) => {
  const session = await farmingSessionModel.getActiveSession(userId);

  if (!session) {
    return null;
  }

  // Check if it's ready and update if needed
  if (session.status === 'active' && farmingSessionModel.isSessionReady(session)) {
    return await checkSession(session.id);
  }

  return session;
};

// Collect materials from a ready session
const collectFarming = async (userId, sessionId) => {
  const session = await farmingSessionModel.getSessionById(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.user_id !== userId) {
    throw new Error('This is not your farming session');
  }

  if (session.status === 'collected') {
    throw new Error('Session already collected');
  }

  if (session.status === 'cancelled') {
    throw new Error('Session was cancelled');
  }

  // If active but ready, check and roll
  if (session.status === 'active') {
    if (!farmingSessionModel.isSessionReady(session)) {
      throw new Error('Session is not ready yet');
    }

    // Roll for materials with duration-based bonuses
    const durationMinutes = Math.floor(session.duration_seconds / 60);
    const result = await rarityService.rollMaterial(session.material_category, durationMinutes);
    await farmingSessionModel.updateSessionReady(
      sessionId,
      result.material.id,
      result.quantity
    );

    session.result_material_id = result.material.id;
    session.result_quantity = result.quantity;
  }

  if (session.status !== 'ready') {
    throw new Error('Session is not ready to collect');
  }

  // Add materials to bank
  await bankService.addItemsToBank(userId, [
    {
      type: 'material',
      id: session.result_material_id,
      quantity: session.result_quantity,
    },
  ]);

  // Mark as collected
  await farmingSessionModel.markSessionCollected(sessionId);

  // Get material details
  const pool = require('../config/database');
  const materialResult = await pool.query(
    'SELECT * FROM materials WHERE id = $1',
    [session.result_material_id]
  );

  return {
    material: materialResult.rows[0],
    quantity: session.result_quantity,
  };
};

// Cancel an active farming session
const cancelFarming = async (userId, sessionId) => {
  const session = await farmingSessionModel.getSessionById(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.user_id !== userId) {
    throw new Error('This is not your farming session');
  }

  if (session.status === 'collected') {
    throw new Error('Cannot cancel a collected session');
  }

  if (session.status === 'cancelled') {
    throw new Error('Session already cancelled');
  }

  await farmingSessionModel.cancelSession(sessionId);

  return { message: 'Session cancelled successfully' };
};

// Get farming history
const getFarmingHistory = async (userId, limit = 10, offset = 0) => {
  const sessions = await farmingSessionModel.getSessionHistory(userId, limit, offset);
  const total = await farmingSessionModel.getSessionCount(userId);

  return {
    sessions,
    total,
  };
};

module.exports = {
  startFarming,
  checkSession,
  getActiveSession,
  collectFarming,
  cancelFarming,
  getFarmingHistory,
};

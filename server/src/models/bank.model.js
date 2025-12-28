const pool = require('../config/database');

// Get all inventory for a user
const getUserBank = async (userId) => {
  const query = `
    SELECT
      pb.id,
      pb.item_type,
      pb.item_id,
      pb.quantity,
      pb.created_at,
      pb.updated_at
    FROM player_banks pb
    WHERE pb.user_id = $1 AND pb.quantity > 0
    ORDER BY pb.item_type, pb.item_id
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get materials with details
const getUserMaterials = async (userId, category = null) => {
  let query = `
    SELECT
      pb.id,
      pb.quantity,
      m.id as material_id,
      m.name,
      m.category,
      m.rarity_id,
      m.vendor_value
    FROM player_banks pb
    JOIN materials m ON pb.item_id = m.id
    WHERE pb.user_id = $1 AND pb.item_type = 'material' AND pb.quantity > 0
  `;

  const params = [userId];

  if (category) {
    query += ` AND m.category = $2`;
    params.push(category);
  }

  query += ` ORDER BY m.category, m.rarity_id`;

  const result = await pool.query(query, params);
  return result.rows;
};

// Get components with details
const getUserComponents = async (userId, category = null) => {
  let query = `
    SELECT
      pb.id,
      pb.quantity,
      c.id as component_id,
      c.name,
      c.category,
      c.rarity_id,
      c.processing_time
    FROM player_banks pb
    JOIN components c ON pb.item_id = c.id
    WHERE pb.user_id = $1 AND pb.item_type = 'component' AND pb.quantity > 0
  `;

  const params = [userId];

  if (category) {
    query += ` AND c.category = $2`;
    params.push(category);
  }

  query += ` ORDER BY c.category, c.rarity_id`;

  const result = await pool.query(query, params);
  return result.rows;
};

// Get items with details
const getUserItems = async (userId) => {
  const query = `
    SELECT
      pb.id,
      pb.quantity,
      i.id as item_id,
      i.name,
      i.category,
      i.rarity_id,
      i.description
    FROM player_banks pb
    JOIN items i ON pb.item_id = i.id
    WHERE pb.user_id = $1 AND pb.item_type = 'item' AND pb.quantity > 0
    ORDER BY i.rarity_id DESC
  `;

  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get tools with details
const getUserTools = async (userId) => {
  const query = `
    SELECT
      pb.id,
      pb.quantity,
      t.id as tool_id,
      t.name,
      t.category,
      t.tier
    FROM player_banks pb
    JOIN tools t ON pb.item_id = t.id
    WHERE pb.user_id = $1 AND pb.item_type = 'tool' AND pb.quantity > 0
    ORDER BY t.category, t.tier
  `;

  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get consumables with details
const getUserConsumables = async (userId) => {
  const query = `
    SELECT
      pb.id,
      pb.quantity,
      c.id as consumable_id,
      c.name,
      c.category
    FROM player_banks pb
    JOIN consumables c ON pb.item_id = c.id
    WHERE pb.user_id = $1 AND pb.item_type = 'consumable' AND pb.quantity > 0
    ORDER BY c.category, c.name
  `;

  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get bank summary (counts and total value)
const getBankSummary = async (userId) => {
  const query = `
    SELECT
      COUNT(CASE WHEN item_type = 'material' THEN 1 END) as material_types,
      COALESCE(SUM(CASE WHEN item_type = 'material' THEN quantity END), 0) as total_materials,
      COUNT(CASE WHEN item_type = 'component' THEN 1 END) as component_types,
      COALESCE(SUM(CASE WHEN item_type = 'component' THEN quantity END), 0) as total_components,
      COUNT(CASE WHEN item_type = 'item' THEN 1 END) as item_types,
      COALESCE(SUM(CASE WHEN item_type = 'item' THEN quantity END), 0) as total_items,
      COUNT(CASE WHEN item_type = 'tool' THEN 1 END) as tool_types,
      COUNT(CASE WHEN item_type = 'consumable' THEN 1 END) as consumable_types,
      COALESCE(SUM(CASE WHEN item_type = 'consumable' THEN quantity END), 0) as total_consumables
    FROM player_banks
    WHERE user_id = $1 AND quantity > 0
  `;

  const result = await pool.query(query, [userId]);

  // Calculate total vendor value for materials
  const valueQuery = `
    SELECT COALESCE(SUM(pb.quantity * m.vendor_value), 0) as total_value
    FROM player_banks pb
    JOIN materials m ON pb.item_id = m.id
    WHERE pb.user_id = $1 AND pb.item_type = 'material'
  `;

  const valueResult = await pool.query(valueQuery, [userId]);

  return {
    ...result.rows[0],
    total_value: parseInt(valueResult.rows[0].total_value)
  };
};

// Add item to bank (or update quantity if exists)
const addItem = async (userId, itemType, itemId, quantity) => {
  const query = `
    INSERT INTO player_banks (user_id, item_type, item_id, quantity)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (user_id, item_type, item_id)
    DO UPDATE SET
      quantity = player_banks.quantity + $4,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `;

  const result = await pool.query(query, [userId, itemType, itemId, quantity]);
  return result.rows[0];
};

// Remove item from bank (decrease quantity)
const removeItem = async (userId, itemType, itemId, quantity) => {
  const query = `
    UPDATE player_banks
    SET quantity = quantity - $4,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $1 AND item_type = $2 AND item_id = $3
    RETURNING *
  `;

  const result = await pool.query(query, [userId, itemType, itemId, quantity]);
  return result.rows[0];
};

// Check if user has specific item with sufficient quantity
const hasItem = async (userId, itemType, itemId, requiredQuantity = 1) => {
  const query = `
    SELECT quantity
    FROM player_banks
    WHERE user_id = $1 AND item_type = $2 AND item_id = $3
  `;

  const result = await pool.query(query, [userId, itemType, itemId]);

  if (result.rows.length === 0) {
    return false;
  }

  return result.rows[0].quantity >= requiredQuantity;
};

// Get specific item quantity
const getItemQuantity = async (userId, itemType, itemId) => {
  const query = `
    SELECT quantity
    FROM player_banks
    WHERE user_id = $1 AND item_type = $2 AND item_id = $3
  `;

  const result = await pool.query(query, [userId, itemType, itemId]);

  if (result.rows.length === 0) {
    return 0;
  }

  return result.rows[0].quantity;
};

module.exports = {
  getUserBank,
  getUserMaterials,
  getUserComponents,
  getUserItems,
  getUserTools,
  getUserConsumables,
  getBankSummary,
  addItem,
  removeItem,
  hasItem,
  getItemQuantity,
};

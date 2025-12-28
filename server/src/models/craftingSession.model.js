const pool = require('../config/database');

// Create a new crafting session
const createSession = async (userId, componentId, processingTime) => {
  const startedAt = new Date();
  const readyAt = new Date(startedAt.getTime() + processingTime * 1000);

  const query = `
    INSERT INTO crafting_sessions
      (user_id, component_id, status, started_at, ready_at, result_quantity)
    VALUES ($1, $2, 'active', $3, $4, 1)
    RETURNING *
  `;

  const result = await pool.query(query, [userId, componentId, startedAt, readyAt]);
  return result.rows[0];
};

// Get active crafting sessions for user
const getActiveSessions = async (userId) => {
  const query = `
    SELECT
      cs.*,
      c.name as component_name,
      c.category as component_category,
      c.rarity_id as component_rarity
    FROM crafting_sessions cs
    JOIN components c ON cs.component_id = c.id
    WHERE cs.user_id = $1 AND cs.status IN ('active', 'ready')
    ORDER BY cs.started_at DESC
  `;

  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get session by ID
const getSessionById = async (sessionId) => {
  const query = `
    SELECT
      cs.*,
      c.name as component_name,
      c.category as component_category,
      c.rarity_id as component_rarity
    FROM crafting_sessions cs
    JOIN components c ON cs.component_id = c.id
    WHERE cs.id = $1
  `;

  const result = await pool.query(query, [sessionId]);
  return result.rows[0] || null;
};

// Mark session as collected
const markSessionCollected = async (sessionId) => {
  const query = `
    UPDATE crafting_sessions
    SET status = 'collected',
        collected_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [sessionId]);
  return result.rows[0];
};

// Mark session as ready (when time is up)
const markSessionReady = async (sessionId) => {
  const query = `
    UPDATE crafting_sessions
    SET status = 'ready',
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [sessionId]);
  return result.rows[0];
};

// Cancel session
const cancelSession = async (sessionId) => {
  const query = `
    UPDATE crafting_sessions
    SET status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [sessionId]);
  return result.rows[0];
};

// Check if session is ready
const isSessionReady = (session) => {
  return new Date() >= new Date(session.ready_at);
};

// Get session history for user
const getSessionHistory = async (userId, limit = 10, offset = 0) => {
  const query = `
    SELECT
      cs.*,
      c.name as component_name,
      c.category as component_category,
      c.rarity_id as component_rarity
    FROM crafting_sessions cs
    JOIN components c ON cs.component_id = c.id
    WHERE cs.user_id = $1 AND cs.status IN ('collected', 'cancelled', 'failed')
    ORDER BY cs.started_at DESC
    LIMIT $2 OFFSET $3
  `;

  const result = await pool.query(query, [userId, limit, offset]);
  return result.rows;
};

// Get count of user's crafting sessions
const getSessionCount = async (userId) => {
  const query = `
    SELECT COUNT(*) as count
    FROM crafting_sessions
    WHERE user_id = $1
  `;

  const result = await pool.query(query, [userId]);
  return parseInt(result.rows[0].count);
};

module.exports = {
  createSession,
  getActiveSessions,
  getSessionById,
  markSessionCollected,
  markSessionReady,
  cancelSession,
  isSessionReady,
  getSessionHistory,
  getSessionCount,
};

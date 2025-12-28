const pool = require('../config/database');

// Create a new farming session
const createSession = async (userId, materialCategory, durationSeconds) => {
  const startedAt = new Date();
  const readyAt = new Date(startedAt.getTime() + durationSeconds * 1000);

  const query = `
    INSERT INTO farming_sessions
      (user_id, material_category, status, started_at, duration_seconds, ready_at)
    VALUES ($1, $2, 'active', $3, $4, $5)
    RETURNING *
  `;

  const result = await pool.query(query, [
    userId,
    materialCategory,
    startedAt,
    durationSeconds,
    readyAt,
  ]);

  return result.rows[0];
};

// Get active farming session for user
const getActiveSession = async (userId) => {
  const query = `
    SELECT *
    FROM farming_sessions
    WHERE user_id = $1 AND status IN ('active', 'ready')
    ORDER BY started_at DESC
    LIMIT 1
  `;

  const result = await pool.query(query, [userId]);
  return result.rows[0] || null;
};

// Get session by ID
const getSessionById = async (sessionId) => {
  const query = `
    SELECT *
    FROM farming_sessions
    WHERE id = $1
  `;

  const result = await pool.query(query, [sessionId]);
  return result.rows[0] || null;
};

// Update session to ready with results
const updateSessionReady = async (sessionId, materialId, quantity) => {
  const query = `
    UPDATE farming_sessions
    SET status = 'ready',
        result_material_id = $2,
        result_quantity = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [sessionId, materialId, quantity]);
  return result.rows[0];
};

// Mark session as collected
const markSessionCollected = async (sessionId) => {
  const query = `
    UPDATE farming_sessions
    SET status = 'collected',
        collected_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [sessionId]);
  return result.rows[0];
};

// Mark session as cancelled
const cancelSession = async (sessionId) => {
  const query = `
    UPDATE farming_sessions
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
      fs.*,
      m.name as material_name,
      m.rarity_id as material_rarity
    FROM farming_sessions fs
    LEFT JOIN materials m ON fs.result_material_id = m.id
    WHERE fs.user_id = $1 AND fs.status IN ('collected', 'cancelled')
    ORDER BY fs.started_at DESC
    LIMIT $2 OFFSET $3
  `;

  const result = await pool.query(query, [userId, limit, offset]);
  return result.rows;
};

// Get count of user's farming sessions
const getSessionCount = async (userId) => {
  const query = `
    SELECT COUNT(*) as count
    FROM farming_sessions
    WHERE user_id = $1
  `;

  const result = await pool.query(query, [userId]);
  return parseInt(result.rows[0].count);
};

module.exports = {
  createSession,
  getActiveSession,
  getSessionById,
  updateSessionReady,
  markSessionCollected,
  cancelSession,
  isSessionReady,
  getSessionHistory,
  getSessionCount,
};

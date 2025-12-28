/**
 * Farming API functions
 * 
 * Handles time-based material gathering sessions. Players can start farming sessions
 * for a specific material category and duration, then collect materials when the
 * session completes.
 */

import client from './client';

/**
 * Start a new farming session
 * 
 * @param {string} materialCategory - Category to farm ('wood', 'metal', 'fish', 'herb')
 * @param {number} durationMinutes - Duration of the farming session in minutes
 * @returns {Promise<Object>} Created farming session object with completion time
 */
export const startFarming = async (materialCategory, durationMinutes) => {
  const response = await client.post('/farming/start', {
    materialCategory,
    durationMinutes,
  });
  return response.data;
};

/**
 * Get the currently active farming session for the user
 * 
 * @returns {Promise<Object|null>} Active farming session or null if none exists
 */
export const getActiveSession = async () => {
  const response = await client.get('/farming/active');
  return response.data;
};

/**
 * Collect materials from a completed farming session
 * 
 * Materials are added to the player's bank. Session must be completed.
 * @param {number} sessionId - ID of the farming session to collect from
 * @returns {Promise<Object>} Collection results including materials received
 */
export const collectFarming = async (sessionId) => {
  const response = await client.post(`/farming/${sessionId}/collect`);
  return response.data;
};

/**
 * Cancel an active farming session
 * 
 * Cancels the session without collecting materials. Session must be active.
 * @param {number} sessionId - ID of the farming session to cancel
 * @returns {Promise<Object>} Confirmation of cancellation
 */
export const cancelFarming = async (sessionId) => {
  const response = await client.post(`/farming/${sessionId}/cancel`);
  return response.data;
};

/**
 * Get farming session history with pagination
 * 
 * @param {number} limit - Maximum number of sessions to return (default: 10)
 * @param {number} offset - Number of sessions to skip for pagination (default: 0)
 * @returns {Promise<Array>} Array of past farming sessions
 */
export const getFarmingHistory = async (limit = 10, offset = 0) => {
  const response = await client.get('/farming/history', {
    params: { limit, offset },
  });
  return response.data;
};

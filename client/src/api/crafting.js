/**
 * Crafting API functions
 * 
 * Handles component crafting sessions. Players can craft components from materials
 * using time-based crafting sessions. Components require specific materials, tools,
 * and consumables as defined in the component requirements.
 */

import client from './client';

/**
 * Get available components for crafting, optionally filtered by category
 * 
 * @param {string|null} category - Optional category filter ('plank', 'ingot', 'fillet', 'extract', 'rope')
 * @returns {Promise<Array>} Array of craftable components with requirements
 */
export const getComponents = async (category = null) => {
  const params = category ? { category } : {};
  const response = await client.get('/crafting/components', { params });
  return response.data;
};

/**
 * Get detailed information about a specific component including all requirements
 * 
 * @param {number} componentId - ID of the component to get details for
 * @returns {Promise<Object>} Component details including materials, tools, and consumables needed
 */
export const getComponentDetails = async (componentId) => {
  const response = await client.get(`/crafting/components/${componentId}`);
  return response.data;
};

/**
 * Start a new crafting session for a component
 * 
 * Validates that the player has all required materials, tools, and consumables.
 * Creates a time-based crafting session.
 * @param {number} componentId - ID of the component to craft
 * @returns {Promise<Object>} Created crafting session object with completion time
 */
export const startCrafting = async (componentId) => {
  const response = await client.post('/crafting/start', { componentId });
  return response.data;
};

/**
 * Get all currently active crafting sessions for the user
 * 
 * @returns {Promise<Array>} Array of active crafting sessions
 */
export const getActiveSessions = async () => {
  const response = await client.get('/crafting/active');
  return response.data;
};

/**
 * Collect a completed component from a crafting session
 * 
 * Component is added to the player's bank. Session must be completed.
 * @param {number} sessionId - ID of the crafting session to collect from
 * @returns {Promise<Object>} Collection results including component received
 */
export const collectCrafting = async (sessionId) => {
  const response = await client.post(`/crafting/${sessionId}/collect`);
  return response.data;
};

/**
 * Cancel an active crafting session
 * 
 * Returns consumed materials/tools/consumables to the player's bank.
 * Session must be active.
 * @param {number} sessionId - ID of the crafting session to cancel
 * @returns {Promise<Object>} Confirmation of cancellation and returned items
 */
export const cancelCrafting = async (sessionId) => {
  const response = await client.post(`/crafting/${sessionId}/cancel`);
  return response.data;
};

/**
 * Get crafting session history with pagination
 * 
 * @param {number} limit - Maximum number of sessions to return (default: 10)
 * @param {number} offset - Number of sessions to skip for pagination (default: 0)
 * @returns {Promise<Array>} Array of past crafting sessions
 */
export const getCraftingHistory = async (limit = 10, offset = 0) => {
  const response = await client.get('/crafting/history', {
    params: { limit, offset },
  });
  return response.data;
};

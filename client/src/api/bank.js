/**
 * Bank API functions
 * 
 * Handles retrieval of player inventory items including materials, components,
 * items, tools, and consumables. All functions require authentication.
 */

import client from './client';

/**
 * Get complete bank inventory for the current user
 * 
 * @returns {Promise<Object>} Complete bank data including all inventory items
 */
export const getBank = async () => {
  const response = await client.get('/bank');
  return response.data;
};

/**
 * Get materials from bank, optionally filtered by category
 * 
 * @param {string|null} category - Optional category filter ('wood', 'metal', 'fish', 'herb')
 * @returns {Promise<Array>} Array of material items with quantities
 */
export const getMaterials = async (category = null) => {
  const params = category ? { category } : {};
  const response = await client.get('/bank/materials', { params });
  return response.data;
};

/**
 * Get components from bank, optionally filtered by category
 * 
 * @param {string|null} category - Optional category filter ('plank', 'ingot', 'fillet', 'extract', 'rope')
 * @returns {Promise<Array>} Array of component items with quantities
 */
export const getComponents = async (category = null) => {
  const params = category ? { category } : {};
  const response = await client.get('/bank/components', { params });
  return response.data;
};

/**
 * Get items from bank
 * 
 * @returns {Promise<Array>} Array of item objects with quantities
 */
export const getItems = async () => {
  const response = await client.get('/bank/items');
  return response.data;
};

/**
 * Get tools from bank
 * 
 * @returns {Promise<Array>} Array of tool objects with quantities
 */
export const getTools = async () => {
  const response = await client.get('/bank/tools');
  return response.data;
};

/**
 * Get consumables from bank
 * 
 * @returns {Promise<Array>} Array of consumable items with quantities
 */
export const getConsumables = async () => {
  const response = await client.get('/bank/consumables');
  return response.data;
};

/**
 * Get bank summary with total counts and statistics
 * 
 * @returns {Promise<Object>} Summary object with counts for each inventory type
 */
export const getSummary = async () => {
  const response = await client.get('/bank/summary');
  return response.data;
};

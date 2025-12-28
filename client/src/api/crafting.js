import client from './client';

export const getComponents = async (category = null) => {
  const params = category ? { category } : {};
  const response = await client.get('/crafting/components', { params });
  return response.data;
};

export const getComponentDetails = async (componentId) => {
  const response = await client.get(`/crafting/components/${componentId}`);
  return response.data;
};

export const startCrafting = async (componentId) => {
  const response = await client.post('/crafting/start', { componentId });
  return response.data;
};

export const getActiveSessions = async () => {
  const response = await client.get('/crafting/active');
  return response.data;
};

export const collectCrafting = async (sessionId) => {
  const response = await client.post(`/crafting/${sessionId}/collect`);
  return response.data;
};

export const cancelCrafting = async (sessionId) => {
  const response = await client.post(`/crafting/${sessionId}/cancel`);
  return response.data;
};

export const getCraftingHistory = async (limit = 10, offset = 0) => {
  const response = await client.get('/crafting/history', {
    params: { limit, offset },
  });
  return response.data;
};

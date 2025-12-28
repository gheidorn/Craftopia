import client from './client';

export const getBank = async () => {
  const response = await client.get('/bank');
  return response.data;
};

export const getMaterials = async (category = null) => {
  const params = category ? { category } : {};
  const response = await client.get('/bank/materials', { params });
  return response.data;
};

export const getComponents = async (category = null) => {
  const params = category ? { category } : {};
  const response = await client.get('/bank/components', { params });
  return response.data;
};

export const getItems = async () => {
  const response = await client.get('/bank/items');
  return response.data;
};

export const getTools = async () => {
  const response = await client.get('/bank/tools');
  return response.data;
};

export const getConsumables = async () => {
  const response = await client.get('/bank/consumables');
  return response.data;
};

export const getSummary = async () => {
  const response = await client.get('/bank/summary');
  return response.data;
};

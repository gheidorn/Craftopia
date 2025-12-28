import client from './client';

export const startFarming = async (materialCategory, durationMinutes) => {
  const response = await client.post('/farming/start', {
    materialCategory,
    durationMinutes,
  });
  return response.data;
};

export const getActiveSession = async () => {
  const response = await client.get('/farming/active');
  return response.data;
};

export const collectFarming = async (sessionId) => {
  const response = await client.post(`/farming/${sessionId}/collect`);
  return response.data;
};

export const cancelFarming = async (sessionId) => {
  const response = await client.post(`/farming/${sessionId}/cancel`);
  return response.data;
};

export const getFarmingHistory = async (limit = 10, offset = 0) => {
  const response = await client.get('/farming/history', {
    params: { limit, offset },
  });
  return response.data;
};

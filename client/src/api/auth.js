import client from './client';

export const register = async (username, email, password) => {
  const response = await client.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await client.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await client.get('/auth/me');
  return response.data;
};

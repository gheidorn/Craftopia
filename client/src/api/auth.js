/**
 * Authentication API functions
 * 
 * Handles user registration, login, and current user information retrieval.
 * All functions use the configured axios client which automatically handles
 * JWT token management.
 */

import client from './client';

/**
 * Register a new user account
 * 
 * @param {string} username - Unique username for the account
 * @param {string} email - User's email address
 * @param {string} password - User's password (will be hashed on server)
 * @returns {Promise<Object>} Response data containing user info and JWT token
 */
export const register = async (username, email, password) => {
  const response = await client.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

/**
 * Login with email and password
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Response data containing user info and JWT token
 */
export const login = async (email, password) => {
  const response = await client.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

/**
 * Get current authenticated user information
 * 
 * Requires valid JWT token in Authorization header (handled automatically by client).
 * @returns {Promise<Object>} Current user's information
 */
export const getMe = async () => {
  const response = await client.get('/auth/me');
  return response.data;
};

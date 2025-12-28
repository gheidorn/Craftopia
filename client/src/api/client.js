/**
 * Axios client configuration for API requests
 * 
 * This module sets up a centralized HTTP client with:
 * - Base URL configuration from environment variables
 * - Automatic JWT token injection for authenticated requests
 * - Automatic logout on 401 unauthorized responses
 */

import axios from 'axios';

// Get API URL from environment variable, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor: Automatically adds JWT token to all requests
 * 
 * Checks localStorage for a token and adds it to the Authorization header
 * if present. This ensures all authenticated API calls include the token.
 */
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor: Handles authentication errors globally
 * 
 * If a 401 Unauthorized response is received, it means the token is invalid/expired.
 * Automatically clears stored auth data and redirects to login page.
 */
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;

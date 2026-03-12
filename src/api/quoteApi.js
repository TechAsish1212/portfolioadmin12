import axios from 'axios';

const API_URL = 'http://localhost:4004/api';

// Get auth token
const getAuthToken = () => localStorage.getItem('adminToken');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Quotes API
export const quoteApi = {
  // Get all quotes (public)
  getAll: async () => {
    const response = await api.get('/quote');
    return response.data;
  },

  // Create new quote (admin)
  create: async (data) => {
    const response = await api.post('/quote', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Update quote (admin)
  update: async (id, data) => {
    const response = await api.put(`/quote/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Delete quote (admin)
  delete: async (id) => {
    const response = await api.delete(`/quote/${id}`);
    return response.data;
  },
};
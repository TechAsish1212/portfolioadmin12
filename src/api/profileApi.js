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

// Profile API
export const profileApi = {
  // Get profile (public)
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Create profile (admin)
  create: async (formData) => {
    const response = await api.post('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update profile (admin)
  update: async (formData) => {
    const response = await api.put('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
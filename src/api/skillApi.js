import axios from 'axios';

// const API_URL ='http://localhost:4004/api';
const API_URL = 'https://portfolio12server.onrender.com/api';

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

// Skills API
export const skillApi = {
  // Get all skills (public)
  getAll: async () => {
    const response = await api.get('/skills');
    return response.data;
  },

  // Create new skill (admin)
  create: async (formData) => {
    const response = await api.post('/skills', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update skill (admin)
  update: async (id, formData) => {
    const response = await api.put(`/skills/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete skill (admin)
  delete: async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  },
};
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

// Education API
export const educationApi = {
  // Get all education (public)
  getAll: async () => {
    const response = await api.get('/education');
    return response.data;
  },

  // Create new education (admin)
  create: async (data) => {
    const response = await api.post('/education', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Update education (admin)
  update: async (id, data) => {
    const response = await api.put(`/education/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Delete education (admin)
  delete: async (id) => {
    const response = await api.delete(`/education/${id}`);
    return response.data;
  },
};
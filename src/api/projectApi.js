// import axios from 'axios';

// // const API_URL = 'http://localhost:4004/api';
// const API_URL = 'https://portfolio12server.onrender.com/api';

// // Get auth token
// const getAuthToken = () => localStorage.getItem('adminToken');

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: API_URL,
// });

// // Add token to requests if it exists
// api.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Projects API
// export const projectApi = {
//   // Get all projects (public)
//   getAll: async () => {
//     const response = await api.get('/project');
//     return response.data;
//   },

//   // Create new project (admin)
//   create: async (formData) => {
//     const response = await api.post('/project', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//   // Update project (admin)
//   update: async (id, formData) => {
//     const response = await api.put(`/project/${id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//   // Delete project (admin)
//   delete: async (id) => {
//     const response = await api.delete(`/project/${id}`);
//     return response.data;
//   },
// };


import api from "../utils/api";

export const projectApi = {
  getAll: async () => {
    const res = await api.get("/project");
    return res.data;
  },

  create: async (formData) => {
    const res = await api.post("/project", formData);
    return res.data;
  },

  update: async (id, formData) => {
    const res = await api.put(`/project/${id}`, formData);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/project/${id}`);
    return res.data;
  },
};
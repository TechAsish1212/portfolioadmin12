import axios from "axios";

const API_URL = "https://portfolio12server.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

// ✅ Request interceptor (token attach)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Response interceptor (auto logout if token invalid)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Token expired or invalid");
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
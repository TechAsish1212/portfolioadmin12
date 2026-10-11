import api from "../utils/api";

export const experienceApi = {
  // Get all experiences (public)
  getAll: async () => {
    const res = await api.get("/experience");
    return res.data;
  },

  // Create experience (admin)
  create: async (formData) => {
    const res = await api.post("/experience", formData);
    return res.data;
  },

  // Update experience (admin)
  update: async (id, formData) => {
    const res = await api.put(`/experience/${id}`, formData);
    return res.data;
  },

  // Delete experience (admin)
  delete: async (id) => {
    const res = await api.delete(`/experience/${id}`);
    return res.data;
  },
};
import api from "./api";

export const reporteService = {
  getById: async (id) => {
    const res = await api.get(`/reportes/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post("/reportes", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/reportes/${id}`, data);
    return res.data;
  }
};
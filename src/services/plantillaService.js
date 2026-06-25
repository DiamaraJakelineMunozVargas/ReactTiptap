import api from "./api";

export const plantillaService = {
  getAll: async () => {
    const res = await api.get("/plantillas");
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/plantillas/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post("/plantillas", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/plantillas/${id}`, data);
    return res.data;
  }
};
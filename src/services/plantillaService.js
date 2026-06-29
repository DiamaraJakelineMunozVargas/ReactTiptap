import api from "./api";
import axios from "axios"



export const plantillaService = {
  BaseUrl:window.origin,
  setUrl: async (url)=>{
    plantillaService.BaseUrl = url
  },
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
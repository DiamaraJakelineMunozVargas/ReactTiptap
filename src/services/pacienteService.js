import api from "./api";

export const pacienteService = {
  // Obtener todos los pacientes
  getAll: async () => {
    const res = await api.get("/pacientes");
    return res.data;
  },

  // Obtener un paciente por ID
  getById: async (id) => {
    const res = await api.get(`/pacientes/${id}`);
    return res.data;
  },

  // Obtener los reportes específicos de un paciente
  getReportes: async (pacienteId) => {
    const res = await api.get(`/reportes/paciente/${pacienteId}`);
    return res.data;
  }
};
//@ts-check
import axios from "axios";

class ReporteService {
  constructor() {
    this.api = axios.create({
      baseURL: window.origin,
    });

    /** @type {import("../interfaces/reporte").Reporte[]} */
    this.reportes = [];
  }

  async setUrl(url) {
    this.api.defaults.baseURL = url;
  }

  async loadReportes() {
    if (this.reportes.length > 0) {
      return this.reportes;
    }

    try {
      const { data } = await this.api.get("/reportes");

      this.reportes = data;

      return this.reportes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  get All() {
    return this.reportes;
  }

  ById(id) {
    return this.reportes.find(r => r._id === id) ?? null;
  }

  async create(data) {
    const { data: reporte } = await this.api.post("/reportes", data);

    this.reportes.push(reporte);

    return reporte;
  }

  async update(id, data) {
    const { data: reporte } = await this.api.put(`/reportes/${id}`, data);

    const index = this.reportes.findIndex(r => r._id === id);

    if (index !== -1) {
      this.reportes[index] = reporte;
    }

    return reporte;
  }

  async delete(id) {
    await this.api.delete(`/reportes/${id}`);

    this.reportes = this.reportes.filter(
      reporte => reporte._id !== id
    );
  }
}

export default new ReporteService();
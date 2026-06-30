//@ts-check
import axios from "axios";

class plantillaService {
  constructor() {
    this.api = axios.create({
      baseURL: window.origin,
    });
    /** @type {import('../interfaces/plantillas').PlantillaEstudio[]} */
    this.plantillas = [];
  }
  async setUrl(url) {
    this.api.defaults.baseURL = url;
  }
  async loadPlantillas() {
    if (this.plantillas.length > 0) {
      return this.plantillas;
    }

    try {
      const res = await this.api.get("/plantillas");

      this.plantillas = res.data;

      return this.plantillas;
    } catch (error) {
      console.error(error);

      return [];
    }
  }
  get All() {
    return this.plantillas;
  }
  ById(id) {
    return this.plantillas.find((plantilla) => plantilla._id === id) ?? null;
  }
  async create(data) {
    const res = await this.api.post("/plantillas", data);

    this.plantillas.push(res.data);

    return res.data;
  }
  async update(id, data) {
    const res = await this.api.put(`/plantillas/${id}`, data);

    const index = this.plantillas.findIndex((p) => p._id === id);

    if (index !== -1) {
      this.plantillas[index] = res.data;
    }

    return res.data;
  }
  async delete(id) {

    await this.api.delete(`/plantillas/${id}`);

    this.plantillas = this.plantillas.filter(

        plantilla => plantilla._id !== id

    );

}
}

export default new plantillaService();

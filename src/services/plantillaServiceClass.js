//@ts-check
import axios from "axios";

class plantillaService {
  contructor() {
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
    for (const plantilla of this.plantillas) {
      if (plantilla._id === id) {
        return plantilla;
      }
    }
    return null;
  }
  async create(data) {
    const res = await this.api.post("/plantillas", data);
    return res.data;
  }
  async update(id, data) {
    const res = await this.api.put(`/plantillas/${id}`, data);
    return res.data;
  }
}

export default new plantillaService();

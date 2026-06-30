//@ts-check
import axios from "axios"

class pacienteService {
  constructor(){
    this.api = axios.create({
      baseURL: window.origin,
    });
    /** @type {import('../interfaces/paciente').PacienteEstudio[]} */
    this.pacientes = [];
  }
  async setUrl(url){
    this.api.defaults.baseURL = url;
  }
  // Obtener todos los pacientes
  async loadPacientes() {
    if(this.pacientes.length > 0){
      return this.pacientes;
    }
    try{
      const res = await this.api.get("/pacientes");
    this.pacientes = res.data;
    return this.pacientes;
    }
    catch(error){
      console.error(error);
      return [];
    }
    
  }
  get All(){
    return this.pacientes;
  }

  // Obtener un paciente por ID
  ById(id) {
   return this.pacientes.find((pacientes) => pacientes._id === id) ?? null 
  }

  // Obtener los reportes específicos de un paciente
  async getReportes(pacienteId) {
    const {data} = await this.api.get(`/reportes/paciente/${pacienteId}`);
    return data;
  }
}
export default new pacienteService();
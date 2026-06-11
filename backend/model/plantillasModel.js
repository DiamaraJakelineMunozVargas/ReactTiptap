import mongoose from "mongoose";

const plantillaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },

  modalidad: {
    type: String,
    required: true,
  },

  tipo_estudio: {
    type: String,
    required: true,
  },

  template: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now, // para que me salga la fecha de hoy en automatico
  },
});

export default mongoose.model("Plantilla", plantillaSchema);

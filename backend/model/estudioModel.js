import mongoose from "mongoose";

// schema o esquema
const estudioSchema = new mongoose.Schema({
  pacId: {
   
    type: String,
    required: true
  },
  modalidad: {
    type: String,
    required: true
  },
  studio: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // para que me salga la fecha de hoy en automatico
  }
 
})
const Estudio = new mongoose.model('Estudio', estudioSchema)
export default Estudio;

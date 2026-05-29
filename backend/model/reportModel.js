import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    pacId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },

  plantillaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plantilla",
    required: true,
  },
  descripcion:{
    type:String,
    default: ""
  },
  contenido:{
    type: String,
    default: " "
  },
   date: {
    type: Date,
    default: Date.now // para que me salga la fecha de hoy en automatico
  }
})

export default mongoose.model("Report", reportSchema);
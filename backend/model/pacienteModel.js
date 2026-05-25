import mongoose from "mongoose";


// schema o esquema 
const pacienteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    edad: {
       type: Number,
       required: true
    },
    telefono: {
        type: String,
        default: ""
    },
    fechaNacimiento: {
        type: Date,
        required: true
    }
   
})
const Paciente = new mongoose.model('Paciente', pacienteSchema)

export default Paciente
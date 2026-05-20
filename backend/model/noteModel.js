import mongoose from "mongoose";


// schema o esquema 
const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // para que me salga la fecha de hoy en automatico 
    },
    content: {
        type: String,
        default: ""
    },
    tipo: {
        type: String,
        default: ""
    }
})
const Note = new mongoose.model('Note', noteSchema)

export default Note 
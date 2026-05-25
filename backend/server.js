import express from 'express';
import router from './routes/routesPaciente.js';
import routerEstudio from './routes/routesEstudio.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))
//Midleware 
app.use(express.json()) //para recibir archivo json 
app.use('/pacientes', router)
app.use('/estudios', routerEstudio)

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_DB_URI) // se llama a la conection de mongo dentro de env 
    .then(() => { // promesas 
        app.listen(PORT, () => {
            console.log(`Servidor levantado en http://localhost:${PORT}`)
        })
    })
    .catch(err => console.error(err))


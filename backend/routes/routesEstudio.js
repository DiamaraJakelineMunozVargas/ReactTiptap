import express from "express";
import {getAll, getEstudiosByPaciente, getId, Create, Update, Deleted} from "../controllers/estudioController.js";

const routerEstudio = express.Router();



routerEstudio.get('/', getAll);
routerEstudio.get('/paciente/:pacId', getEstudiosByPaciente);
routerEstudio.get('/:id', getId);
routerEstudio.post('/', Create);
routerEstudio.put('/:id', Update);
routerEstudio.delete('/:id', Deleted);

export default routerEstudio;
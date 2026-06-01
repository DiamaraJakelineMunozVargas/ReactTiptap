import express from 'express';
import {getAll, getById, getByPaciente,post, editar, eliminar} from "../controllers/reportController.js";

const routesreport = express.Router();

routesreport.get('/', getAll);
routesreport.get('/:id', getById);
routesreport.get('/paciente/:pacienteId', getByPaciente);
routesreport.post('/', post);
routesreport.put('/:id',editar);
routesreport.delete('/:id',eliminar);

export default routesreport;


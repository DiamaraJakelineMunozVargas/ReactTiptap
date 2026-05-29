import express from 'express';
import {getAll, getById, post, editar, eliminar} from "../controllers/reportController.js";

const routesreport = express.Router();

routesreport.get('/', getAll);
routesreport.get('/:id', getById);
routesreport.post('/', post);
routesreport.put('/:id',editar);
routesreport.delete('/:id',eliminar);

export default routesreport;


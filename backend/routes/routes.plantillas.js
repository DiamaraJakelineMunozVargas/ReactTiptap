import express from "express";
import {getAll, getId, create,update, eliminar} from "../controllers/plantillaController.js";

const routerplantilla = express.Router();

routerplantilla.get('/', getAll);
routerplantilla.get('/:id', getId);
routerplantilla.post('/', create);
routerplantilla.put('/:id', update);
routerplantilla.delete('/:id',eliminar);

export default routerplantilla;
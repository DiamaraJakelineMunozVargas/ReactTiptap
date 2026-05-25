import express from "express";
import { getAll, getId, create, update, eliminar } from "../controllers/noteController.js";


const router = express.Router();

// obtener todas las notas 
router.get('/', getAll);
// obtener una nota por id 
router.get('/:id', getId);
// crear una nota 
router.post('/', create);

// actualizar una nota 
router.put('/:id', update)
// eliminar una nota 
router.delete('/:id', eliminar)



export default router;
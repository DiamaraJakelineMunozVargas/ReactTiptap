import express from "express";
import {getAllPaciente,getPacienteCompleto,getIdPaciente,CreatePaciente, update, eliminar} from "../controllers/pacienteController.js";

const router = express.Router();



router.get('/', getAllPaciente);
router.get('/completo/:id', getPacienteCompleto);
router.get('/:id', getIdPaciente);
router.post('/', CreatePaciente);
router.put('/:id', update);
router.delete('/:id', eliminar);

export default router;
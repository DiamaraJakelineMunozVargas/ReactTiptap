import Paciente from "../model/pacienteModel.js";
import Estudio from "../model/estudioModel.js";

// obtener todas los pacientes
export const getAllPaciente = async (req, res) => {
    try {
        const pacientes = await Paciente.find()
        res.status(200).json(pacientes)
        console.log('obteniendo todas los pacientes')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
export const getPacienteCompleto = async (req, res) => {
    try {

        const paciente = await Paciente.findById(req.params.id);

        if (!paciente) {
            return res.status(404).json({
                message: "Paciente no encontrado"
            });
        }

        const estudios = await Estudio.find({
            pas_id: paciente.pas_id
        });

        res.json({
            ...paciente.toObject(),
            estudios
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
// obtener un paciente por id 
export const getIdPaciente = async (req, res) => {
    try {
        const id = req.params.id
        const pac = await Paciente.findById(id)
        console.log(pac)
        if (!pac) return res.status(404).json({ error: 'No se encontro el paciente' })
        res.status(200).json(pac)
        console.log('Obtener paciente por id')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
// agregar un paciente
export const CreatePaciente = async (req, res) => {
    try {
        const { name, sexo, edad, telefono, fechaNacimiento } = req.body
        const newPaciente = new Paciente({ name, sexo, edad, telefono, fechaNacimiento }) // para crear un paciente
        const savedPaciente = await newPaciente.save(); // espera el inicio de guardado en la BD
        res.status(201).json({ mensaje: 'Paciente creado exitosamente', nota: savedPaciente }) // muestrta un estado de la respuesta y su mensaje 
        console.log('Creando un paciente')

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
// actualizar un paciente
export const update = async (req, res) => {
    try {
        const id = req.params.id
        const updatePaciente = await Paciente.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatePaciente) return res.status(404).json({ error: 'dato no encontrado' })
        res.status(200).json(updatePaciente)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

// eliminar un paciente
export const eliminar = async (req, res) => {
    try {
        const id = req.params.id
        const deletePaciente = await Paciente.findByIdAndDelete(id)
        if (!deletePaciente) return res.status(404).json({ error: 'dato no encontrado' })
        res.status(200).json({ mensaje: 'Paciente eliminado', nota: deletePaciente })
        console.log('eliminando un paciente')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}


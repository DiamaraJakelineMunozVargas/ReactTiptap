import plantillasModel from "../model/plantillasModel.js";

export const getAll = async (req, res) => {
    try {
        const notes = await plantillasModel.find()
        res.status(200).json(notes)
        console.log('obteniendo todas las plantillas')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
// obtener una plantilla por id 
export const getId = async (req, res) => {
    try {
        const id = req.params.id
        const note = await plantillasModel.findById(id)
        console.log(note)
        if (!note) return res.status(404).json({ error: 'No se encontro' })
        res.status(200).json(note)
        console.log('Obtener nota por id')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
// crear una plantilla :v 

export const create = async (req, res) => {
    try {
        console.log(req.body)
        const { nombre, modalidad, tipo_estudio, descripcion, contenido } = req.body
        const newNote = new plantillasModel({ nombre, modalidad, tipo_estudio, descripcion, contenido }) // para crear una nota 
        const savedNote = await newNote.save(); // espera el inicio de guardado en la BD
        res.status(201).json({ mensaje: 'plantilla creada exitosamente', nota: savedNote }) // muestrta un estado de la respuesta y su mensaje 
        console.log('Creando una plantilla')

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
// actualizar una plantilla 
export const update = async (req, res) => {
    try {
        const id = req.params.id
        const updateNote = await plantillasModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateNote) return res.status(404).json({ error: 'dato no encontrado' })
        res.status(200).json(updateNote)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

// eliminar una plantilla
export const eliminar = async (req, res) => {
    try {
        const id = req.params.id
        const deleteNote = await plantillasModel.findByIdAndDelete(id)
        if (!deleteNote) return res.status(404).json({ error: 'dato no encontrado' })
        res.status(200).json({ mensaje: 'Nota eliminada', nota: deleteNote })
        console.log('eliminando una nota')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}


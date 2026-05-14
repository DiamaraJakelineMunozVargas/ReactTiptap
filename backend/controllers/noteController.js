import Note from "../model/noteModel.js";


// obtener todas las notas 
export const getAll = async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
        console.log('obteniendo todas las notas')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
// obtener una nota por id 
export const getId = async (req, res) => {
    try {
        const id = req.params.id
        const note = await Note.findById(id)
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
// crear una nota 
export const create = async (req, res) => {
    try {
        const { name, title } = req.body
        const newNote = new Note({ name, title }) // para crear una nota 
        const savedNote = await newNote.save(); // espera el inicio de guardado en la BD
        res.status(201).json({ mensaje: 'Nota creada exitosamente', nota: savedNote }) // muestrta un estado de la respuesta y su mensaje 
        console.log('Creando una nota')

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
// actualizar una nota 
export const update = async (req, res) => {
    try {
        const id = req.params.id
        const updateNote = await Note.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateNote) return res.status(404).json({ error: 'dato no encontrado' })
        res.status(200).json(updateNote)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

// eliminar una nota 
export const eliminar = async (req, res) => {
    try {
        const id = req.params.id
        const deleteNote = await Note.findByIdAndDelete(id)
        if (!deleteNote) return res.status(404).json({ error: 'dato no encontrado' })
        res.status(200).json({ mensaje: 'Nota eliminada', nota: deleteNote })
        console.log('eliminando una nota')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}


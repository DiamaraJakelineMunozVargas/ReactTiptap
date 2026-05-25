import Estudio from "../model/estudioModel.js";

export const getAll = async (req, res) => {
    try {
        const notes = await Estudio.find()
        res.status(200).json(notes)
        console.log('obteniendo todos los estudios')
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }

}
export const getEstudiosByPaciente = async (req, res) => {
    try {
        const estudios = await Estudio.find({
            pacId: req.params.pacId
        });

        res.json(estudios);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
export const getId = async (req, res) => {
  try {
    const id = req.params.id;
    const estudio = await Estudio.findById(id);
    console.log(estudio);
    if (!estudio)
      return res
        .status(404)
        .json({ error: "no se encontro el estudio, no existe" });
    res.status(200).json(estudio);
    console.log("obtener estudio por id");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "no se pudo conectar con el servidor" });
  }
};
export const Create = async (req, res) => {
  try {
    const {pacId, modalidad, studio } = req.body;
    const newEstudio = new Estudio({ pacId, modalidad, studio });
    const saveEstudio = await newEstudio.save();
    res.status(201).json({ mensaje: "Estudio creado", estudio: saveEstudio });
    console.log("Estudio Creado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
export const Update = async (req, res) => {
  try {
    const id = req.params.id;
    const estudio = await Estudio.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!estudio) return res.status(404).json({ error: "dato no encontrado" });
    res.status(200).json(estudio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
export const Deleted = async(req, res) =>{
try{
    const id = req.params.id;
    const estudio = await Estudio.findByIdAndDelete(id)
    if(!estudio) return res.status(404).json({error: 'dato no encontrado'})
        res.status(200).json({mensaje: "Estudio eliminado exitosamente", nota: estudio})
    console.log("eliminado un estudio")
}
catch(error){
    console.error(error)
    res.status(500).json({error: "Error del servidor"});
}
}

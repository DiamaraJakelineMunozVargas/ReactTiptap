import reportModel from "../model/reportModel.js";

export const getAll = async (req, res) => {
  try {
    const reportes = await reportModel.find().populate("pacId").populate("plantillaId");
    res.status(200).json(reportes);
    console.log("obteniendo todos los reportes");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
export const getById = async (req, res) => {
  try {
    const reporte = await reportModel
      .findById(req.params.id)
      .populate("pacId") // para traer datos de otra tabla :0  aqui trae a paciente
      .populate("plantillaId"); // plantilla

    res.status(200).json(reporte);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error en el servidor",
    });
  }
};

// reportes por pacientes 
export const getByPaciente = async (req, res) => {
  try {

    const reportes = await reportModel
      .find({ pacId: req.params.pacienteId })
      .populate("plantillaId");

    res.json(reportes);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Error servidor" });

  }
};
export const post = async (req, res) => {
  try {
    console.log("BODY RECIBIDO");
    const {pacId, plantillaId, descripcion, contenido } = req.body;
    const newreport = new reportModel({pacId, plantillaId, descripcion, contenido });
    const savedreport = await newreport.save();
    res.status(201).json({ mensaje: "reporte guardado", reporte: savedreport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error en el servidor" });
  }
};
export const editar = async (req, res) => {
  try {
    const id = req.params.id;
    const updatere = await reportModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after", runValidators: true,
    });
    if (!updatere) {return res.status(404).json({ error: "dato no encontrado" });}
    res.status(200).json({mensaje: "reporte actualizado", reporte: updatere,})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error en el servidor" });
  }
};
export const eliminar = async (req, res) => {
  try {
    const id = req.params.id;
    const elirepo = await reportModel.findByIdAndDelete(id);
    if (!elirepo) return res.status(404).json({ error: "dato no encontrado" });
    res.status(200).json({ mensaje: "Reporte eliminado", nota: elirepo });
    console.log("eliminando un reporte");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error en el servidor" });
  }
};

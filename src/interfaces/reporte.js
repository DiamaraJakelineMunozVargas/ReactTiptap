/**
 * @typedef {Object} Reporte
 *
 * @property {string} _id - Identificador único del reporte
 *
 * @property {import("./paciente").Paciente} pacId
 * Paciente asociado al reporte.
 *
 * @property {import("./plantillas").PlantillaEstudio} plantillaId
 * Plantilla utilizada para generar el reporte.
 *
 * @property {string} template
 * Contenido HTML final del reporte.
 *
 * @property {string} date
 * Fecha de creación del reporte.
 *
 * @property {number} __v
 * Versión del documento.
 */

export {};
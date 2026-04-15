// features/editorTipTap/services/RecetaService.js

/**
 * Transforma los datos del formulario al formato JSON que Tiptap entiende.
 * Es agnóstico: no le importa si los datos vienen de un estado o de una DB.
 */
export const prepararContenidoReceta = (datos) => {
    return {
        type: 'doc',
        content: [{
            type: 'formModulo',
            attrs: {
                paciente: datos.paciente || '',
                edad: datos.edad || '',
                diagnostico: datos.diagnostico || '',
                prescripcion: datos.prescripcion || '',
            }
        }]
    };
};

/**
 * Aquí podrías tener el método GET en el futuro
 */
export const obtenerRecetaDeBD = async (id) => {
    // const response = await fetch(`/api/recetas/${id}`);
    // return await response.json();
    console.log("Simulando GET de la receta", id);
};
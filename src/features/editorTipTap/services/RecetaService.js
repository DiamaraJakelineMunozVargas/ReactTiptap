
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
                indicaciones: datos.indicaciones || '',
            }
        }]
    };
};


export const obtenerRecetaDeBD = async (id) => {
    // const response = await fetch(`/api/recetas/${id}`);
    // return await response.json();
    console.log("Simulando GET de la receta", id);
};
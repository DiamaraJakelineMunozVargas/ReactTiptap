
import { useState } from 'react';

export const useReceta = () => {

    const [datosReceta, setDatosReceta] = useState({
        paciente: '',
        edad: '',
        diagnostico: '',
        prescripcion: '',
        indicaciones: ''
    });

    // le indicamos que por favor lo seleccionado se vaya al campo de Prescripcion
    const manejarSeleccionMedicamento = (medicamentoTexto) => {
        setDatosReceta(prev => ({
            ...prev,

            prescripcion: prev.prescripcion
                ? `${prev.prescripcion}\n${medicamentoTexto}`
                : medicamentoTexto
        }));
    };


    const limpiarReceta = () => {
        setDatosReceta({
            paciente: '',
            edad: '',
            diagnostico: '',
            prescripcion: '',
            indicaciones: ''
        });
    };


    return {
        datosReceta,
        setDatosReceta,
        manejarSeleccionMedicamento,
        limpiarReceta
    };
};
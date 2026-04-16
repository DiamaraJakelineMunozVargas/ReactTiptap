// features/editorTipTap/componentes/BuscadorMedicamentos.jsx
import React from 'react';
import Select from 'react-select';


const listaMedicamentos = [
    { value: 'Paracetamol 500mg', label: 'Paracetamol - 500mg' },
    { value: 'Ibuprofeno 400mg', label: 'Ibuprofeno - 400mg' },
    { value: 'Amoxicilina 1g', label: 'Amoxicilina - 1g' },
];

export default function BuscadorMedicamentos({ alSeleccionar }) {

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            // Enviamos el valor (nombre y dosis) a la función que actualiza el estado
            alSeleccionar(selectedOption.value);
        }
    };

    return (
        <div className="word-toolbar-medicamentos" style={{ padding: '10px 20px', background: 'white', borderBottom: '1px solid #ccc' }}>
            <div style={{ width: '400px' }}>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="🔍 Buscar medicamento (ej. Paracetamol)..."
                    isSearchable={true}
                    isClearable={true}
                    name="medicamento"
                    options={listaMedicamentos}
                    onChange={handleChange}
                    // Esto limpia el buscador después de seleccionar
                    value={null}
                />
            </div>
            <small style={{ marginLeft: '15px', color: '#666' }}>
                Selecciona para agregar a Prescripción
            </small>
        </div>
    );
}
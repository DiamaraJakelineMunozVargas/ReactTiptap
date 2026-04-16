import React from 'react';
import '../styles/FormularioDatos.css';

const FormularioDatos = ({ datos, setDatos }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="formulario-datos-container">
            <header>
                <h3>Registro de Información</h3>
                <p>Complete los campos para generar la receta automática</p>
            </header>

            <div className="grid-inputs">
                <div className="input-group">
                    <label>Paciente</label>
                    <input name="paciente" value={datos.paciente} onChange={handleChange} placeholder="Nombre completo" />
                </div>
                <div className="input-group">
                    <label>Edad</label>
                    <input name="edad" value={datos.edad} onChange={handleChange} placeholder="Ej. 25 años" />
                </div>
                <div className="input-group full-width">
                    <label>Diagnóstico</label>
                    <textarea name="diagnostico" value={datos.diagnostico} onChange={handleChange} placeholder="Breve descripción..." />
                </div>
                <div className="input-group full-width">
                    <label>Prescripción (RP)</label>
                    <textarea name="prescripcion" value={datos.prescripcion} onChange={handleChange} placeholder="Medicamentos y dosis..." />
                </div>
                <div className="input-group full-width">
                    <label>Indicaciones(RP)</label>
                    <textarea name="indicaciones" value={datos.indicaciones} onChange={handleChange} placeholder="Tomar después de las comidas..." />
                </div>
            </div>
        </div>
    );
};

export default FormularioDatos;
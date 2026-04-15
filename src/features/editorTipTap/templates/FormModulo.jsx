import { NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import { recetaSchema } from './plantilla';
import '../styles/Receta.css';

const FormModulo = () => {
    return (
        <NodeViewWrapper className="form-modulo-visual">
            <div className="receta-container">

                <header className="receta-header">
                    <div className="logo-placeholder">🏥</div>
                    <div className="hospital-info">
                        <h1>{recetaSchema.institucion}</h1>
                        <p>Receta Médica Digital</p>
                    </div>
                </header>

                <hr />
                <div className="receta-body">
                    {recetaSchema.secciones.map((seccion) => (
                        <div key={seccion.id} className={`campo-grupo ${seccion.id}`}>
                            <label>{seccion.label}:</label>

                            <span
                                data-field
                                className="doc-field"
                                data-placeholder={seccion.placeholder}
                                contentEditable={true}
                            >

                            </span>
                        </div>
                    ))}
                </div>


                <footer className="receta-footer">
                    <div className="firma-linea">
                        <p>Firma y Sello del Médico</p>
                    </div>
                </footer>
            </div>
        </NodeViewWrapper>
    );
};

export default FormModulo;
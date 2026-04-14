import { NodeViewWrapper } from '@tiptap/react'
import React from 'react'

const FormModulo = (props) => {
    console.log(props)
    return (
        <NodeViewWrapper className="form-modulo-visual">

            <div>

                <h2>
                    FORMULARIO DE REGISTRO
                </h2>

                <label>Nombre del Proyecto:</label>


                <span className="fake-field"></span>

                <label>CI:</label>

                <span className="fake-field"></span>

            </div>

        </NodeViewWrapper>
    )
}

export default FormModulo;
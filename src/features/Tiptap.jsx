import { useState } from 'react';
import DocumentoModal from './editorTipTap/componentes/DocumentModal'
import Toolbar from './editorTipTap/componentes/Toolbar';
import ModalEditor from '../shared/Modal/ModalEditor';
import FormularioDatos from './editorTipTap/componentes/FormularioDAtos';
import { prepararContenidoReceta } from './editorTipTap/services/RecetaService';

const Tiptap = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editorInstance, setEditorInstance] = useState(false);
    const [datosReceta, setDatosReceta] = useState({
        paciente: '', edad: '', diagnostico: '', prescripcion: ''
    });

    const comandos = {
        // Al abrir el modal, el editor nacerá con el HTML que generamos arriba
        mostrarReceta: () => {
            setModalAbierto(true);
        },
        guardarEnConsola: () => {
            console.log("Datos actuales en el modelo local:", datosReceta);
            alert("Datos capturados");
        }
    };
    // const comandos = {
    //     insertarFormulario: () => {
    //         setModalAbierto(true);
    //         // Esperamos un poquito a que el modal y el editor existan
    //         setTimeout(() => {
    //             editorInstance?.commands.setContent({
    //                 type: 'doc',
    //                 content: [{ type: 'formModulo' }],
    //             });
    //         }, 100);
    //     },
    //     guardar: () => {
    //         console.log("Guardando...", editorInstance?.getHTML());
    //         setModalAbierto(false);
    //     }
    // };

    return (
        <div className="editor-main-container">

            <Toolbar editor={editorInstance} comandos={comandos} />


            <FormularioDatos datos={datosReceta} setDatos={setDatosReceta} />

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={comandos.guardarEnConsola} className="btn-save">
                    Confirmar Datos
                </button>
            </div>

            <ModalEditor
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                titulo="Generación de Receta Médica"
            >
                {modalAbierto && (
                    <DocumentoModal
                        onEditorInit={(editor) => setEditorInstance(editor)}

                        contenidoInicial={prepararContenidoReceta(datosReceta)}
                    />
                )}
            </ModalEditor>
        </div>
        // <div className="editor-main-container">

        //     <Toolbar editor={editorInstance} comandos={{
        //         insertarFormulario: () => setModalAbierto(true),
        //         guardar: () => console.log("Guardado!")
        //     }} />
        //     <FormularioDatos datos={datosReceta} setDatos={setDatosReceta} />

        //     <ModalEditor isOpen={modalAbierto} onClose={() => setModalAbierto(false)}>
        //         <DocumentoModal
        //             onEditorInit={(editor) => setEditorInstance(editor)}
        //             datosPrellenados={datosReceta}
        //         />
        //     </ModalEditor>
        // </div>
    );
};

export default Tiptap;
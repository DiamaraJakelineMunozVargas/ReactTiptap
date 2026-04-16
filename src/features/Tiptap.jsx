import { useState } from 'react';
import DocumentoModal from './editorTipTap/componentes/DocumentModal'
import Toolbar from './editorTipTap/componentes/Toolbar';
import ModalEditor from '../shared/Modal/ModalEditor';
import FormularioDatos from './editorTipTap/componentes/FormularioDAtos';
import { prepararContenidoReceta } from './editorTipTap/services/RecetaService';
import BuscadorMedicamentos from './editorTipTap/componentes/Buscador';
import { useReceta } from './editorTipTap/services/useReceta';

const Tiptap = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editorInstance, setEditorInstance] = useState(false);
    const { datosReceta, setDatosReceta, manejarSeleccionMedicamento } = useReceta();
    const comandos = {

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
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <BuscadorMedicamentos alSeleccionar={manejarSeleccionMedicamento} />

                    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f0f2f5', padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
                        {modalAbierto && (
                            <DocumentoModal
                                onEditorInit={(editor) => setEditorInstance(editor)}
                                contenidoInicial={prepararContenidoReceta(datosReceta)}
                            />
                        )}
                    </div>
                </div>
            </ModalEditor>
        </div>

    );
};

export default Tiptap;
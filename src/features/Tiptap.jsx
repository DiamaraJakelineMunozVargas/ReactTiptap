import { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FormModuloExtension from './editorTipTap/extensions/ExtensionModulo';
import DocumentoModal from './editorTipTap/componentes/DocumentModal'
import Toolbar from './editorTipTap/componentes/Toolbar';
import ModalEditor from '../shared/Modal/ModalEditor'; // Importamos el nuevo componente
import Field from './editorTipTap/extensions/FieldExtension';
const Tiptap = () => {
    const [modalAbierto, setModalAbierto] = useState(false);


    const editor = useEditor({
        extensions: [StarterKit, FormModuloExtension, Field],
        content: '',
        onCreate: ({ editor }) => {

        },

    });
    const comandos = {
        insertarFormulario: () => {
            setModalAbierto(true);

            setTimeout(() => {
                editor.commands.setContent({
                    type: 'doc',
                    content: [
                        {
                            type: 'formModulo',
                        },
                    ],
                });


                editor.commands.focus('end');
            }, 50);
        },

        guardar: () => {
            console.log("Guardando...", editor.getHTML());
            setModalAbierto(false);
        }
    };

    return (
        <div className="editor-main-container">

            <Toolbar editor={editor} comandos={comandos} />


            <ModalEditor
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                titulo="Módulo de Registro"
            >
                <EditorContent editor={editor} />
            </ModalEditor>

        </div>
    );
};

export default Tiptap;
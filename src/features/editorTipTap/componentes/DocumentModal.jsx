
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FormModuloExtension from '../extensions/ExtensionModulo';

import Field from '../extensions/FieldExtension';
import '../styles/DocumentModal.css';

export default function DocumentoModal({ onEditorInit, contenidoInicial }) {
  const editor = useEditor({
    extensions: [StarterKit, FormModuloExtension, Field],
    content: contenidoInicial,
    // content: {
    //   type: 'doc',
    //   content: [
    //     {
    //       type: 'formModulo',
    //     },
    //   ],
    // },
    onCreate: ({ editor }) => {


      onEditorInit(editor);

    },

    editorProps: {
      handleDOMEvents: {
        keydown: (view, event) => {
          const { selection } = view.state;
          const $pos = selection.$from;


          // Revisamos 
          const currentNode = $pos.node($pos.depth);
          const isField = currentNode.type.name === 'field' || currentNode.attrs['data-field'] !== undefined;

          // También revisamos el elemento HTML real bajo el cursor (por seguridad)
          const targetIsField = event.target.closest('[data-field]');

          // SI estamos en un campo, PERMITIMOS TODO
          if (isField || targetIsField) {
            return false;
          }

          // SI NO estamos en un campo, bloqueamos excepto flechas de dirección
          const isArrowKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);

          if (!isArrowKey) {
            event.preventDefault();
            return true;
          }

          return false;
        },

        mousedown: (view, event) => {
          const target = event.target;
          // Si el clic es en un campo, permitimos que el cursor se ponga ahí
          if (target.closest('[data-field]')) {
            return false;
          }
          // Si es fuera, bloqueamos el foco
          event.preventDefault();
          return true;
        }
      }
    }
  });
  console.log(contenidoInicial)
  return (
    <div className="documento-wrapper">
      <EditorContent editor={editor} />
    </div>
  );
}
// features/editorTipTap/componentes/DocumentoModal.jsx
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FormModuloExtension from '../extensions/ExtensionModulo';
import Field from '../extensions/FieldExtension';
import '../styles/DocumentModal.css';

export default function DocumentoModal({ onEditorInit }) {

  const editor = useEditor({

    extensions: [StarterKit, FormModuloExtension, Field],
    content: '',
    editorProps: {
      handleDOMEvents: {
        beforeinput: (view, event) => {
          const target = event.target;

          if (!target.closest("[data-field]") && !target.closest("input")) {
            event.preventDefault();
            return true;
          }
          return false;
        },
      },
    },
    onCreate: ({ editor }) => {

      onEditorInit(editor);
    },
  });

  return <EditorContent editor={editor} />;
}
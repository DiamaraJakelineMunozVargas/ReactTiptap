import Tiptap from "./Tiptap";
import "./styles/documento.css";

const DocumentEditor = ({

  editor,
  setActiveEditor,
}) => {
  return (
    <div className="max-w-[900px] mx-auto p-6 flex flex-col gap-6">

      <div className="documento-pdf bg-white shadow-2xl p-12 min-h-[200px] rounded-sm text-black">

        <div
          className="cursor-text min-h-[120px] focus:outline-none"
          onClick={() => setActiveEditor(editor)}
        >

          <Tiptap editor={editor} />
        </div>


      </div>
    </div>
  );
};

export default DocumentEditor;

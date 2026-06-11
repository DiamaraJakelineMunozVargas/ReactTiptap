import Tiptap from "./Tiptap";
import "../styles/documento.css";
import Wordtoolbar from "./Wordtoolbar";

function DocumentoEditor({
  editor,
  handleSave,
  handlePrint,
  printRef,
}) {

  return (

    <div>

      <Wordtoolbar
        editor={editor}
        handleSave={handleSave}
        handlePrint={handlePrint}
      />

      <div className="
        bg-base-200
        flex
        justify-center
        text-black
      ">

        <div
          ref={printRef}
          className="
            documento-pdf
            bg-white
            shadow-2xl
            ring-1
            ring-black/5
            p-10
          "
        >

          <Tiptap editor={editor} />

        </div>

      </div>

    </div>
  );
}

export default DocumentoEditor;
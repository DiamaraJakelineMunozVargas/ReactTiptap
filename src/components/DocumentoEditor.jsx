import Tiptap from "./Tiptap";
import "../styles/documento.css";
import Wordtoolbar from "./Wordtoolbar";
import QRCode from "react-qr-code";

function DocumentoEditor({
  editor,
  handleSave,
  handlePrint,
  printRef,
  paciente,
  plantilla,
  fechaFormateada,
}) {
  return (
    <div>
      <Wordtoolbar
        editor={editor}
        handleSave={handleSave}
        handlePrint={handlePrint}
      />

      <div
        className="
        bg-base-200
        flex
        justify-center
        text-black
      "
      >
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
          <div className="flex justify-end mb-4">
            <QRCode
              size={80}
              value={JSON.stringify({
                paciente: paciente?.name,
                edad: paciente?.edad,
                modalidad: plantilla?.modalidad,
                fecha: fechaFormateada,
              })}
            />
          </div>
          <Tiptap editor={editor} />
        </div>
      </div>
    </div>
  );
}

export default DocumentoEditor;

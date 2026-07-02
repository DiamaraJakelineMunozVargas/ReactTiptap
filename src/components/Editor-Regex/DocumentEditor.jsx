import Tiptap from "./Tiptap";
import "./styles/documento.css";
import QRCode from "react-qr-code";

const DocumentEditor = ({ editor, mostrarQR, qrValue }) => {
  return (
    <div className="max-w-[900px] mx-auto p-6 flex flex-col gap-6">
      <div className="documento-pdf bg-white shadow-2xl p-12 min-h-[200px] rounded-sm text-black">
        <div className="cursor-text min-h-[120px] focus:outline-none">
          {mostrarQR && <QRCode value={qrValue} size={60} />}
          <span className="mt-2 text-[10px] font-semibold uppercase">
            {qrValue}
          </span>

          <Tiptap editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;

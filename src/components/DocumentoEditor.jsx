import Tiptap from "./Tiptap";
import "../styles/documento.css";
import Wordtoolbar from "./Wordtoolbar";

import ReporteTemplate from "../../public/templates/ReporteTemplate.jsx";

function DocumentoEditor({
  editor,
  editorDescripcion,
  activeEditor,
  setActiveEditor,
  plantilla,
  paciente,
  fechaFormateada,
  handleSave,
  handlePrint,
  printRef,
}) {
  const templates = {
    reporte: ReporteTemplate,
   
  };

  const TemplateComponent = templates[plantilla.modalidad] || ReporteTemplate;

  return (
    <div>
      <Wordtoolbar
        editor={activeEditor || editor}
        handleSave={handleSave}
        handlePrint={handlePrint}
      />

      <div className="bg-base-200 flex justify-center text-black">
        <TemplateComponent
          nota={plantilla}
          pac={paciente}
          fechaFormateada={fechaFormateada}
          printRef={printRef}
        >
          <div className="reporte-contenido">
            <h2 className="font-bold mb-2">Descripcion:</h2>
            <div onClick={() => setActiveEditor(editorDescripcion)}>
              <Tiptap editor={editorDescripcion} />
            </div>
          </div>
          <div className="reporte-contenido">
            <h2 className="font-bold mb-2">Contenido:</h2>
            <div onClick={() => setActiveEditor(editor)}>
              <Tiptap editor={editor} />
            </div>
          </div>
        </TemplateComponent>
      </div>
    </div>
  );
}

export default DocumentoEditor;

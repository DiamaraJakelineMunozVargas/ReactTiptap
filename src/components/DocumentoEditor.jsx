import Tiptap from "./Tiptap";
import "../styles/documento.css";
import Wordtoolbar from "./Wordtoolbar";
import CartaTemplate from "../../public/templates/CartaTemplate.jsx";
import ReporteTemplate from "../../public/templates/ReporteTemplate.jsx";

function DocumentoEditor({
  editor,
  editorDescripcion,
  plantilla,
  paciente,
  fechaFormateada,
  handleSave,
  handlePrint,
  printRef,
}) {
  const templates = {
    reporte: ReporteTemplate,
    carta: CartaTemplate,
  };

  const TemplateComponent = templates[plantilla.modalidad] || ReporteTemplate;

  return (
    <div>
      <Wordtoolbar
        editor={editor}
        editorDescripcion={editorDescripcion}
        handleSave={handleSave}
        handlePrint={handlePrint}
      />

      <div className="bg-base-200 flex justify-center text-black">
        <TemplateComponent
          nota={plantilla}
          pac= {paciente}
          fechaFormateada={fechaFormateada}
          printRef={printRef}
        >
          <div className="reporte-contenido">
            <h2 className="font-bold mb-2">Descripcion:</h2>

            <Tiptap editor={editorDescripcion} />
          </div>
          <div className="reporte-contenido">
            <h2 className="font-bold mb-2">Contenido:</h2>

            <Tiptap editor={editor} />
          </div>
        </TemplateComponent>
      </div>
    </div>
  );
}

export default DocumentoEditor;

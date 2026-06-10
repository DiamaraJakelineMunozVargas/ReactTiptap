import Tiptap from "./Tiptap";
import "../styles/documento.css";
import Wordtoolbar from "./Wordtoolbar";
import QRCode from "react-qr-code";

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

 
  const datosPaciente = {
    nombre: paciente.name,
    edad: paciente.edad,
    fechaNacimiento: paciente.fechaNacimiento,
  };

 
  const datosReporte = [
    {
      key: "descripcion",
      editor: editorDescripcion,
    },
    {
      key: "contenido",
      editor: editor,
    },
  ];

  
  const formatearTexto = (texto) => {
    return texto

      // separa camelCase
      .replace(/([A-Z])/g, " $1")

      // reemplaza guiones y underscores
      .replace(/[-_]/g, " ")

      // mayusculas
      .toUpperCase()

      // elimina espacios dobles
      .replace(/\s+/g, " ")

      .trim();
  };

  // FORMATEAR FECHAS AUTOMATICAMENTE
  const formatearValor = (key, value) => {

    // DETECTA CAMPOS FECHA CON REGEX
    if (/fecha/i.test(key)) {
      return new Date(value).toLocaleDateString();
    }

    return value;
  };

  return (
    <div>

      <Wordtoolbar
        editor={activeEditor || editor}
        handleSave={handleSave}
        handlePrint={handlePrint}
      />

      <div className="bg-base-200 flex justify-center text-black">

        <div
          ref={printRef}
          className="documento-pdf bg-white shadow-2xl ring-1 ring-black/5"
        >

          {/* HEADER */}
          <div className="flex justify-between items-start mb-8">

            <div className="text-center border-b-3 border-black mb-8 rounded-sm">

              <h1 className="text-2xl font-serif font-bold uppercase tracking-tighter underline">
                {plantilla.modalidad} - {plantilla.nombre}
              </h1>

              <p className="text-sm opacity-60">
                Fecha de emisión: {fechaFormateada}
              </p>

              {/* DATOS PACIENTE DINAMICOS */}
              <div className="mb-3 text-left gap-y-2 text-sm">

                {Object.entries(datosPaciente).map(
                  ([key, value]) => (

                    <p key={key}>

                      <strong>
                        {formatearTexto(key)}:
                      </strong>{" "}

                      {formatearValor(key, value)}

                    </p>
                  )
                )}

              </div>
            </div>

            {/* QR */}
            <div className="flex flex-col items-center">

              <QRCode
                value={`
                  Paciente: ${paciente.name}
                  | Estudio: ${plantilla.nombre}
                `}
                size={110}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                title="Estudio Clinico"
              />

              <p className="text-xs mt-2 text-center">
                <strong>
                  ESCANEAR PARA <br />
                  VER EL ESTUDIO
                </strong>
              </p>

            </div>
          </div>

          {/* SECCIONES DINAMICAS */}
          {datosReporte.map((item) => (

            <div
              key={item.key}
              className="reporte-contenido"
            >

              <h2 className="font-bold mb-2">
                {formatearTexto(item.key)}
              </h2>

              <div
                onClick={() =>
                  setActiveEditor(item.editor)
                }
              >

                <Tiptap editor={item.editor} />

              </div>

            </div>
          ))}

          {/* FOOTER */}
          <footer className="border-t border-gray-300 mt-12 pt-20 flex justify-around">

            <div className="text-center w-64">

              <div className="border-t border-black pt-2">

                <p className="font-semibold">
                  Dr. Juan Pérez
                </p>

                <p className="text-sm text-gray-600">
                  Médico Radiólogo
                </p>

                <p className="text-xs text-gray-500">
                  Mat. Prof. 123456
                </p>

              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}

export default DocumentoEditor;
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DocumentoEditor from "../components/DocumentoEditor";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useRef } from "react";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import ResizeImage from "tiptap-extension-resize-image";
import FontSize from "../extensions/FontSize";
import { UnderlineStyle } from "../extensions/Underline";
import { LifeLine } from "react-loading-indicators";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-text-style";
import { reemplazarVariables } from "../utils/MotorRegex";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

const Reports = () => {
  const [plantilla, setPlantilla] = useState(null); // plantilla = null 
  const [paciente, setPaciente] = useState(null); //paciente = null 
  const [reporte, setReporte] = useState(null); //reporte = null 
  const [ready, setReady] = useState(false); //ready = false 
  const [activeEditor, setActiveEditor] = useState(null); 
  const { paciente_id, plantilla_id, reporte_id } = useParams(); // leer los parametros de la URL ;) 

  useEffect(() => {
    (async () => {
      try {
        if (reporte_id) {
          const responseEditar = await axios.get(
            `http://localhost:3000/reportes/${reporte_id}`,
          );
          console.log(responseEditar.data);
          setReporte(responseEditar.data);
          setPaciente(responseEditar.data.pacId);
          setPlantilla(responseEditar.data.plantillaId);
          setReady(true);
        } else {
          const [responsepaciente, responseplantilla] = await Promise.all([
            axios.get(`http://localhost:3000/pacientes/${paciente_id}`),
            axios.get(`http://localhost:3000/plantillas/${plantilla_id}`),
          ]);
          console.log(responseplantilla.data);
          console.log(responsepaciente.data);

          setPlantilla(responseplantilla.data);
          setPaciente(responsepaciente.data);
          setReporte({
            pacId: responsepaciente.data._id,
            plantillaId: responseplantilla.data._id,
            template: responseplantilla.data.template || "",
          });

          setReady(true);
        }
      } catch (error) {
        console.error("Error al obtener la plantilla:", error);
      }
    })();
  }, []);

  const editorTemplate = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      UnderlineStyle,
      ResizeImage,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setReporte((prev) => ({
        ...prev,

        template: editor.getHTML(),
      }));
    },
    editorProps: {
      handlePaste(view, event) {
        const items = event.clipboardData?.items;

        if (!items) return false;

        // IMAGENES
        for (const item of items) {
          if (item.type.startsWith("image")) {
            const file = item.getAsFile();

            const reader = new FileReader();

            reader.onload = () => {
              const src = reader.result;

              editor.chain().focus().setImage({ src }).run();
            };

            reader.readAsDataURL(file);

            return true;
          }
        }

        // HTML (WORD / GOOGLE DOCS)
        const html = event.clipboardData.getData("text/html");

        if (html) {
          editor.chain().focus().insertContent(html).run();

          return true;
        }

        // TEXTO PLANO
        const text = event.clipboardData.getData("text/plain");

        if (text) {
          const formattedText = text
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join("");

          editor.chain().focus().insertContent(formattedText).run();

          return true;
        }

        return false;
      },
    },
  });

  const handleSave = async () => {
    try {
      if (reporte._id) {
        await axios.put(
          `http://localhost:3000/reportes/${reporte._id}`,
          reporte,
        );
        alert("reporte Actualizado");
      } else {
        console.log(reporte);
        await axios.post("http://localhost:3000/reportes", reporte);

        alert("Guardado correctamente");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "reporte",
  });
  const htmlFinal = reemplazarVariables(
    reporte?.template || "",

    {
      paciente,
      plantilla,

      fechaActual: new Date().toLocaleDateString(),

      contenido: reporte?.contenido || "",
    },
  );
  useEffect(() => {
    if (editorTemplate && htmlFinal && editorTemplate.getHTML() === "<p></p>") {
      editorTemplate.commands.setContent(htmlFinal);
    }
  }, [editorTemplate, htmlFinal]);

  if (!ready) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LifeLine
          color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
          size="large"
          text="Cargando"
          textColor="black"
        />
      </div>
    );
  }

  const fechaFormateada = new Date(plantilla.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <DocumentoEditor
        htmlFinal={htmlFinal}
        editor={editorTemplate}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
        plantilla={plantilla}
        paciente={paciente}
        fechaFormateada={fechaFormateada}
        handleSave={handleSave}
        handlePrint={handlePrint}
        printRef={printRef}
        
      />
    </div>
  );
};

export default Reports;

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

const Reports = () => {
  const [plantilla, setPlantilla] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [reporte, setReporte] = useState(null);
  const [ready, setReady] = useState(false);
  const [activeEditor, setActiveEditor] = useState(null);
  const { paciente_id, plantilla_id, reporte_id } = useParams();

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
            descripcion: responseplantilla.data.descripcion || "",
            contenido: responseplantilla.data.contenido || "",
          });

          setReady(true);
        }
      } catch (error) {
        console.error("Error al obtener la plantilla:", error);
      }
    })();
  }, []);

  const handleContentChange = (newContent) => {
    setReporte((prev) => ({
      ...prev,
      contenido: newContent,
    }));
  };
  const editorDescripcion = useEditor({
    extensions: [StarterKit, TextStyle, FontFamily, FontSize, UnderlineStyle],
    content: "",
    onUpdate: ({ editor }) => {
      setReporte((prev) => ({
        ...prev,
        descripcion: editor.getHTML(),
      }));
    },
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      UnderlineStyle,
      ResizeImage,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      handleContentChange(editor.getHTML());
    },
    editorProps: {
      handlePaste(view, event) {
        const items = event.clipboardData?.items;

        if (!items) return false;

        for (const item of items) {
          if (item.type.startsWith("image")) {
            const file = item.getAsFile();

            const reader = new FileReader();

            reader.onload = () => {
              const src = reader.result;

              editor
                .chain()
                .focus()
                .setImage({
                  src,
                })
                .run();
            };

            reader.readAsDataURL(file);

            return true;
          }
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
  useEffect(() => {
    if (
      editorDescripcion &&
      reporte?.descripcion &&
      editorDescripcion.isEmpty
    ) {
      editorDescripcion.commands.setContent(reporte.descripcion);
    }
    if (editor && reporte?.contenido && editor.isEmpty) {
      editor.commands.setContent(reporte.contenido);
    }
  }, [editor, editorDescripcion, reporte]);

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
        editor={editor}
        editorDescripcion={editorDescripcion}
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

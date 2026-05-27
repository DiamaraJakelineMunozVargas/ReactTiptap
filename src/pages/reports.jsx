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

const Reports = () => {
  const [plantilla, setPlantilla] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [ready, setReady] = useState(false);
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        const [responsepaciente, responseplantilla] = await Promise.all([
          axios.get(`http://localhost:3000/pacientes/${params.paciente_id}`),
          axios.get(`http://localhost:3000/plantillas/${params.plantilla_id}`),
        ]);
        console.log(responseplantilla.data);
        console.log(responsepaciente.data);

        setPlantilla(responseplantilla.data);
        setPaciente(responsepaciente.data);
        setReady(true);
      } catch (error) {
        console.error("Error al obtener la plantilla:", error);
      }
    })();
  }, []);

  const handleContentChange = (newContent) => {
    setPlantilla((prev) => ({
      ...prev,
      contenido: newContent,
    }));
  };
  const editorDescripcion = useEditor({
    extensions: [StarterKit, TextStyle, FontFamily, FontSize, UnderlineStyle],
    content: "",
    onUpdate: ({ editor }) => {
      setPlantilla((prev) => ({
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
      await axios.put(
        `http://localhost:3000/plantillas/${params.plantilla_id}`,
        plantilla,
      );

      alert("Guardado correctamente");
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
      plantilla?.descripcion &&
      editorDescripcion.isEmpty
    ) {
      editorDescripcion.commands.setContent(plantilla.descripcion);
    }
    if (editor && plantilla?.contenido && editor.isEmpty) {
      editor.commands.setContent(plantilla.contenido);
    }
  }, [editor, editorDescripcion, plantilla]);

  if (!ready) {
    return <div>Loading...</div>;
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

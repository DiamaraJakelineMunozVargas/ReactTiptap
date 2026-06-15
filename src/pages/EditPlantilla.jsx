import axios from "axios";
import { toast } from "react-toastify";
import NavbarCompo from "../components/NavbarCompo";
import { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import Wordtoolbar from "../components/Wordtoolbar";

import { Color } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import ResizeImage from "tiptap-extension-resize-image";
import FontSize from "../extensions/FontSize";
import { UnderlineStyle } from "../extensions/Underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import PlantillaForm from "../components/PlantillaForm";

const EditPlantilla = () => {
  const [activeEditor, setActiveEditor] = useState(null);

  const [infoPlantilla, setInfoPlantilla] = useState({
    ready: false,
    data: [],
  });

  const [selectedPlantilla, setSelectedPlantilla] = useState(null);

  const [datos, setDatos] = useState({
    nombre: "",
    modalidad: "",
    tipo_estudio: "",
    template: "",
  });

  // OBTENER PLANTILLAS
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/plantillas");

        setInfoPlantilla({
          ready: true,
          data: response.data,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // MANEJAR INPUTS
  const handleMetaChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // EDITOR
  const editorTemplate = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      UnderlineStyle,
      ResizeImage,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
    ],

    content: "",

    onUpdate: ({ editor }) => {
      setDatos((prev) => ({
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

        // HTML
        const html = event.clipboardData.getData("text/html");

        if (html) {
          editor.chain().focus().insertContent(html).run();

          return true;
        }

        // TEXTO
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

  // SELECCIONAR PLANTILLA
  const seleccionarPlantilla = (plantilla) => {
    setSelectedPlantilla(plantilla);

    setDatos({
      nombre: plantilla.nombre || "",
      modalidad: plantilla.modalidad || "",
      tipo_estudio: plantilla.tipo_estudio || "",
      template: plantilla.template || "",
    });

    editorTemplate?.commands.setContent(plantilla.template || "");
  };

  // GUARDAR CAMBIOS
  const handleSave = async () => {
    if (!selectedPlantilla) {
      toast.warning("Seleccione una plantilla");

      return;
    }

    try {
      const plantillaActualizada = {
        ...datos,
        template: editorTemplate.getHTML(),
      };

      await axios.put(
        `http://localhost:3000/plantillas/${selectedPlantilla._id}`,
        plantillaActualizada,
      );

      toast.success("Plantilla actualizada");
    } catch (error) {
      console.error(error);

      toast.error("Error al actualizar");
    }
  };

  if (!infoPlantilla.ready) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarCompo />

      {/* TOOLBAR */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300">
        <Wordtoolbar
          editor={activeEditor || editorTemplate}
          handleSave={handleSave}
          handlePrint={() => window.print()}
        />
      </div>

      {/* LISTA PLANTILLAS */}
      <div className="max-w-[900px] mx-auto p-4">
        <h2 className="font-bold text-xl mb-4">Seleccione una plantilla</h2>

        <div className="flex flex-wrap gap-2">
          {infoPlantilla.data.map((item) => (
            <button
              key={item._id}
              className="
                btn
                btn-outline
              "
              onClick={() => seleccionarPlantilla(item)}
            >
              {item.modalidad} - {item.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* FORMULARIO */}
      <PlantillaForm
        datos={datos}
        onMetaChange={handleMetaChange}
        editor={editorTemplate}
        setActiveEditor={setActiveEditor}
      />
    </div>
  );
};

export default EditPlantilla;

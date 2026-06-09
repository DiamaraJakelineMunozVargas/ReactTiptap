import axios from "axios";
import { toast } from "react-toastify";
import NavbarCompo from "../components/NavbarCompo";
import { useNavigate } from "react-router-dom";
import TextAlign from "@tiptap/extension-text-align";
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import Wordtoolbar from "../components/Wordtoolbar";
import { Color } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import ResizeImage from "tiptap-extension-resize-image";
import FontSize from "../extensions/FontSize";
import { UnderlineStyle } from "../extensions/Underline";
import PlantillaForm from "../components/PlantillaForm";

const CreateNote = () => {
  const navigate = useNavigate();
  const [activeEditor, setActiveEditor] = useState(null);
  const [datos, setDatos] = useState({
    nombre: "",
    modalidad: "",
    tipo_estudio: "",
  });
  const handleMetaChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const editorDescripcion = useEditor({
    extensions: [StarterKit, TextStyle, FontFamily, FontSize, UnderlineStyle, TextAlign.configure({types: ['heading',  'paragraph']}), Color],
    
    content: "",
    onUpdate: ({ editor }) => {
      setDatos((prev) => ({
        ...prev,
        descripcion: editor.getHTML(),
      }));
    },
  });

  const editorContenido = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      UnderlineStyle,
      ResizeImage,
      TextAlign.configure({types:['heading','paragraph']}), Color
    ],
    content:
      "",
    onUpdate: ({ editor }) => {
      setDatos((prev) => ({
        ...prev,
        contenido: editor.getHTML(),
      }));
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
              editor.chain().focus().setImage({ src }).run();
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
  });
  const handleCreate = async () => {
    if (!datos.nombre || !datos.modalidad) {
      toast.warning("Por favor asigne un nombre y modalidad de plantilla");
      return;
    }
    if (!editorContenido || !editorDescripcion) {
      toast.error("Los editores de texto aún no están listos.");
      return;
    }
    try {
      const htmlDescripcion = editorDescripcion.getHTML();
      const htmlContenido = editorContenido.getHTML();

      const plantillaCompleta = {
        nombre: datos.nombre,
        modalidad: datos.modalidad,
        tipo_estudio: datos.tipo_estudio,
        descripcion: htmlDescripcion,
        contenido: htmlContenido,
      };
      console.log(plantillaCompleta);
      const res = await axios.post(
        `http://localhost:3000/plantillas`,
        plantillaCompleta,
      );

      if (res.status !== 201) {
        throw new Error("error al crear la plantilla");
      }

      toast.success("Plantilla creada con éxito", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al guardar la plantilla");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarCompo />

      <div className="sticky top-0 z-10 bg-white border-b border-gray-300">
        <Wordtoolbar
          editor={activeEditor || editorContenido}
          handleSave={handleCreate}
          handlePrint={() => window.print()}
        />
      </div>

      <PlantillaForm
        datos={datos}
        onMetaChange={handleMetaChange}
        editorContenido={editorContenido}
        editorDescripcion={editorDescripcion}
        setActiveEditor={setActiveEditor}
      />
    </div>
  );
};

export default CreateNote;

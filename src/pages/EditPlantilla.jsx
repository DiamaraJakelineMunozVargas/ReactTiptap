import axios from "axios";
import { toast } from "react-toastify";
import NavbarCompo from "../components/NavbarCompo";
import { useEffect, useState } from "react";
import { EditorRegex } from "../components/Editor-Regex";

const EditPlantilla = () => {
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
  // SELECCIONAR PLANTILLA
  const seleccionarPlantilla = (plantilla) => {
    setSelectedPlantilla(plantilla);

    setDatos({
      nombre: plantilla.nombre || "",
      modalidad: plantilla.modalidad || "",
      tipo_estudio: plantilla.tipo_estudio || "",
      template: plantilla.template || "",
    });

    
  };

  // GUARDAR CAMBIOS
  const handleSave = async (htmlEditor) => {
    if (!selectedPlantilla) {
      toast.warning("Seleccione una plantilla");
      return;
    }

    try {
      const plantillaActualizada = {
        ...datos,
        template: htmlEditor,
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
        {/* <Wordtoolbar
          editor={activeEditor || editorTemplate}
          handleSave={handleSave}
          handlePrint={() => window.print()}
        /> */}
           

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

      <EditorRegex onSave={handleSave} onPrint={() => window.print()} datos={datos} initialContent={datos.template} />
    
  
    </div>
  );
};

export default EditPlantilla;

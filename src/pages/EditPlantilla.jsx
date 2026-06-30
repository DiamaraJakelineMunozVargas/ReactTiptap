
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreatePage from "../components/Editor-Regex/CreatePage";
import FormTemplate from "../components/Editor-Regex/FormTemplate";
import plantillaServiceClass from "../services/plantillaServiceClass";

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

  const camposFormulario = [
    { name: "nombre", label: "Nombre de la Plantilla", type: "text" },
    { name: "modalidad", label: "Modalidad (Ej: Rayos X, Eco)", type: "text" },
    { name: "tipo_estudio", label: "Tipo de Estudio", type: "text" },
  ];


   const variablesMedicas = [
    { label: "Nombre Paciente", value: "{{paciente.name}}" },
    { label: "Edad Paciente", value: "{{paciente.edad}}" },
    { label: "Fecha Actual", value: "{{fechaActual}}" },
    {label: "Nombre de la plantilla", value: "{{plantilla.nombre}}"},
    {label: "Modalidad", value: "{{plantilla.modalidad}}"},
    {label: "Tipo de Estudio", value:"{{plantilla.tipo_estudio}}"}
  ];

  
  const cargarPlantillasDeServidor = async () => {
    try {
      const data = await plantillaServiceClass.loadPlantillas(); 
      setInfoPlantilla({
        ready: true,
        data: data,
      });
    } catch (error) {
      console.error("Error al cargar plantillas:", error);
      toast.error("No se pudieron cargar las plantillas del servidor");
    }
  };

  useEffect(() => {
    cargarPlantillasDeServidor();
  }, []);


  const seleccionarPlantilla = (plantilla) => {
    setSelectedPlantilla(plantilla);
    setDatos({
      nombre: plantilla.nombre || "",
      modalidad: plantilla.modalidad || "",
      tipo_estudio: plantilla.tipo_estudio || "",
      template: plantilla.template || "",
    });
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSave = async (htmlEditor) => {
    if (!selectedPlantilla) {
      toast.warning("Por favor, seleccione una plantilla primero.");
      return;
    }
    if (!datos.nombre.trim() || !datos.modalidad.trim() || !datos.tipo_estudio.trim()) {
      toast.warning("Todos los campos del formulario son obligatorios.");
      return;
    }

    try {
      const plantillaActualizada = {
        ...datos,
        template: htmlEditor, 
      };

     
      await plantillaServiceClass.update(selectedPlantilla._id, plantillaActualizada);
      
      toast.success("¡Plantilla actualizada correctamente! 🔄");
      
     
      await cargarPlantillasDeServidor(); 
    } catch (error) {
      console.error("Error al actualizar la plantilla:", error);
      toast.error("Error al actualizar la plantilla en el servidor.");
    }
  };

  if (!infoPlantilla.ready) {
    return <div className="p-10 text-center font-bold">Cargando plantillas...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      
      <CreatePage
        variables={variablesMedicas}
        initialContent={datos.template}
        onChange={(html) => setDatos((prev) => ({ ...prev, template: html }))}
        onSave={handleSave}
      >
       
        <div className="max-w-5xl mx-auto p-4 flex flex-col gap-6">
          
         
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h2 className="font-bold text-gray-700 text-lg mb-3">Seleccione la Plantilla a Modificar:</h2>
            <div className="flex flex-wrap gap-2">
              {infoPlantilla.data.map((item, index) => (
                <button
                  key={item._id || `plantilla-${index}`}
                  type="button"
                  className={`btn btn-sm ${
                    selectedPlantilla?._id === item._id 
                      ? "btn-primary text-white" 
                      : "btn-outline btn-primary"
                  }`}
                  onClick={() => seleccionarPlantilla(item)}
                >
                  {item.modalidad} - {item.nombre}
                </button>
              ))}
            </div>
          </div>

      
          {selectedPlantilla && (
            <div className="transition-all duration-300">
              <FormTemplate 
                fields={camposFormulario}
                values={datos}
                onChange={handleInputChange}
              />
            </div>
          )}

          {!selectedPlantilla && (
            <p className="text-center text-gray-500 italic py-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              Elija una plantilla arriba para empezar a editar sus campos y estructura en el editor inferior.
            </p>
          )}
        </div>
      </CreatePage>
    </div>
  );
};

export default EditPlantilla;
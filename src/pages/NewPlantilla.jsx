import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreatePage from "../components/Editor-Regex/CreatePage";
import FormTemplate from "../components/Editor-Regex/FormTemplate"; 
import { plantillaService } from "../services/plantillaService";

const NewPlantilla = () => {
  const navigate = useNavigate();
  

  const [contenidoHtml, setContenidoHtml] = useState("");


  const [formValores, setFormValores] = useState({
    nombre: "",
    modalidad: "",
    tipo_estudio: ""
  });

  // Configuración de los campos que quiere el form
  const camposFormulario = [
    { name: "nombre", label: "Nombre de la Plantilla", type: "text" },
    { name: "modalidad", label: "Modalidad (Ej: Rayos X, Eco)", type: "text" },
    {name: "tipo_estudio", label: "Tipo de Estudio", type:"text"}
  ];

  // Variables para la barra de herramientas del wordtoolbar
  const variablesMedicas = [
    { label: "Nombre Paciente", value: "{{paciente.name}}" },
    { label: "Edad Paciente", value: "{{paciente.edad}}" },
    { label: "Fecha Actual", value: "{{fechaActual}}" },
    {label: "Nombre de la plantilla", value: "{{plantilla.nombre}}"},
    {label: "Modalidad", value: "{{plantilla.modalidad}}"},
    {label: "Tipo de Estudio", value:"{{plantilla.tipo_estudio}}"}
  ];

  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValores((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleGuardarPlantilla = async () => {
   
    if (!formValores.nombre.trim() || !formValores.modalidad.trim()) {
      toast.warning("Por favor, llena el nombre y la modalidad de la plantilla.");
      return;
    }
    if (!contenidoHtml || contenidoHtml === "<p></p>") {
      toast.warning("El cuerpo de la plantilla no puede estar vacío.");
      return;
    }

    try {
    
      await plantillaService.create({
        
        nombre: formValores.nombre,
        modalidad: formValores.modalidad,
        tipo_estudio: formValores.tipo_estudio,
        template: contenidoHtml,
      });

      toast.success("¡Plantilla guardada con éxito!");
      navigate("/"); 
    } catch (error) {
      console.error("Error al crear la plantilla:", error);
      toast.error("Hubo un error al guardar la plantilla en el servidor.");
    }
  };

  return (
    <CreatePage
      variables={variablesMedicas}
      initialContent=""
      onChange={(html) => setContenidoHtml(html)}
      onSave={handleGuardarPlantilla}
    >
  
      <div className="max-w-5xl mx-auto p-4">
        <FormTemplate 
          fields={camposFormulario}
          values={formValores}
          onChange={handleFormChange}
        />
        <p className="text-xs text-gray-500 italic text-center mt-4">
          Diseña el contenido base abajo. Recuerda que puedes usar las variables del menú.
        </p>
      </div>
    </CreatePage>
  );
};

export default NewPlantilla;
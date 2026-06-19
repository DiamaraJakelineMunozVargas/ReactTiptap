import axios from "axios";
import { toast } from "react-toastify";
import NavbarCompo from "../components/NavbarCompo";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { EditorRegex } from "../components/Editor-Regex";


const CreateNote = () => {
  const variables = [
    {
      label: "Nombre Paciente",
      value: "{{paciente.name}}",
    },
    {
      label: "Edad",
      value: "{{paciente.edad}}",
    },
    {
      label: "Fecha Nacimiento",
      value: "{{paciente.fechaNacimiento}}",
    },
    {
      label: "Fecha Actual",
      value: "{{fechaActual}}",
    },
    {
      label: "Nombre de Estudio",
      value: "{{plantilla.nombre}}",
    },
    {
      label: "Modalidad",
      value: "{{plantilla.modalidad}}",
    },
    {
      label: "Tipo Estudio",
      value: "{{plantilla.tipo_estudio}}",
    },
  ];
  const navigate = useNavigate();
  
  const [datos, setDatos] = useState({
    nombre: "",
    modalidad: "",
    tipo_estudio: "",
    template: "",
  });
  const handleTemplateChange = (html) => { 
    setDatos((prev) => ({
      ...prev,
      template: html,
    }));
  };
  const handleMetaChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleCreate = async () => {
    if (!datos.nombre || !datos.modalidad) {
      toast.warning("Por favor asigne un nombre y modalidad de plantilla");
      return;
    }

    try {
      const plantillaCompleta = {
        nombre: datos.nombre,
        modalidad: datos.modalidad,
        tipo_estudio: datos.tipo_estudio,
        template: datos.template,
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
      

      <div className="bg-base-300 p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
            Nombre de la Plantilla
          </label>
          <input
            className="input w-full bg-white border-0 focus:outline-none text-black"
            placeholder="Ej: Radiografía de Tórax"
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={handleMetaChange}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
            Modalidad
          </label>
          <input
            className="input w-full bg-white border-0 focus:outline-none text-black"
            placeholder="Ej: RX, ECO, TAC"
            type="text"
            name="modalidad"
            value={datos.modalidad}
            onChange={handleMetaChange}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
            Tipo de Estudio
          </label>
          <input
            className="input w-full bg-white border-0 focus:outline-none text-black"
            placeholder="Ej: Clínico"
            type="text"
            name="tipo_estudio"
            value={datos.tipo_estudio}
            onChange={handleMetaChange}
          />
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-white border-b border-gray-300">
        <EditorRegex
          onSave={handleCreate}
  
          variables={variables}
        
          onChange={handleTemplateChange}
        ></EditorRegex>
    
      </div>

   
    </div>
  );
};

export default CreateNote;

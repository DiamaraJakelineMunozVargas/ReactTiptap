import React from "react";

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

const InsertVariableSelect = ({ editor }) => {
  return (
    <select
     
      className="
        h-8
        text-sm
        border
        border-[#d2d0ce]
        rounded
        px-2
        bg-white
      "
      defaultValue=""
      onChange={(e) => {
        if (!e.target.value) return;

        editor.chain().focus().insertContent(e.target.value).run();

        e.target.value = "";
      }}
    >
      <option value="">Datos</option>

      {variables.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default InsertVariableSelect;

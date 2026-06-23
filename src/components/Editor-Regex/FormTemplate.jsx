const FormTemplate = ({
  datos,
  handleMetaChange,
}) => {
  return (
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
  );
};

export default FormTemplate;
import Tiptap from "./Tiptap";

const PlantillaForm = ({
  datos,
  onMetaChange,
  editor,
  setActiveEditor,
}) => {
  return (
    <div className="max-w-[900px] mx-auto p-6 flex flex-col gap-6">
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
            onChange={onMetaChange}
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
            onChange={onMetaChange}
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
            onChange={onMetaChange}
          />
        </div>
      </div>

      <div className="documento-pdf bg-white shadow-2xl p-12 min-h-[200px] rounded-sm text-black">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-1">
          Descripción y Contenido (Datos para administración)
        </h2>
       
        <div
          className="cursor-text min-h-[120px] focus:outline-none"
          onClick={() => setActiveEditor(editor)}
        >
          
          <Tiptap editor={editor} />
        </div>
        
       
      </div>
    </div>
  );
};

export default PlantillaForm;

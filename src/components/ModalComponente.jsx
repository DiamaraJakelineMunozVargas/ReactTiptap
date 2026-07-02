import { useEffect, useRef } from "react";
import { Pencil, X } from "lucide-react";

const ModalComponente = ({
  isOpen,
  onClose,

  tituloSeccionSuperior = "Elementos registrados",
  textoVacioSuperior = "No hay registros disponibles.",
  columnasTabla = ["Categoría", "Detalle", "Acciones"],
  datosSuperiores = [],
  onAccionSuperior,
  textoBotonSuperior = "Editar",
  iconoBotonSuperior,

  tituloSeccionInferior = "Seleccionar opción",
  datosInferiores = [],
  onAccionInferior,

  searchValue = "",
  onSearchChange,
  placeholderBuscar = "Buscar...", 
}) => {
    const IconoSuperior = iconoBotonSuperior ?? Pencil;
  const dialogRef = useRef(null);

  // Control del diálogo nativo de HTML5
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return; 

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box max-w-4xl">
        
        {/* Encabezado Principal */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-xl">{tituloSeccionSuperior}</h3>
          <button className="btn btn-sm btn-circle" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        {/* 1. SECCIÓN SUPERIOR: Tabla Genérica */}
        {datosSuperiores.length === 0 ? (
          <div className="alert mb-6">
            {textoVacioSuperior}
          </div>
        ) : (
          <div className="overflow-x-auto mb-6">
            <table className="table w-full">
              <thead>
                <tr>
                  {columnasTabla.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datosSuperiores.map((fila,index) => (
                  <tr key={fila.id || index}>
                    <td>{fila.celda1}</td>
                    <td>{fila.celda2}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-primary btn-sm flex items-center gap-2"
                        onClick={() => onAccionSuperior?.(fila.originalData)} 
                      >
                        <IconoSuperior size={16} />
                        {textoBotonSuperior}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      
        {/* 2. SECCIÓN INFERIOR: Buscador e Input */}
        <div className="mb-4">
          <h3 className="font-bold text-xl mb-2">{tituloSeccionInferior}</h3>
          <input 
            type="text"
            className="input input-bordered w-full"
            placeholder={placeholderBuscar}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

     
        <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
          {datosInferiores.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No se encontraron opciones.</p>
          ) : (
            datosInferiores.map((opcion) => (
              <button
                key={opcion.id}
                className="btn btn-outline w-full justify-start text-left"
                onClick={() => onAccionInferior?.(opcion.originalData)}
              >
                {opcion.textoVisible}
              </button>
            ))
          )}
        </div>

      </div>
    </dialog>
  );
};

export default ModalComponente;
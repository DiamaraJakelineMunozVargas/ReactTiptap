import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SearchComponent from "./SearchComponent.jsx";
import { Pencil } from "lucide-react";
const ModalComponente = ({ selectedNote, isOpen, onClose }) => {
  const dialogref = useRef(null);
  const [plantillas, setPlantillas] = useState([]);
  const [search, setSearch] = useState("");
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    if (!dialogref.current) return;

    if (isOpen) {
      dialogref.current.showModal();

      cargarPlantillas();
      CargarReports();
    } else {
      dialogref.current.close();
    }
  }, [isOpen]);

  const plantillasFiltradas = plantillas.filter((plantilla) =>
    plantilla.nombre.toLowerCase().includes(search.toLowerCase()) || 
  plantilla.modalidad.toLowerCase().includes(search.toLowerCase())
  );

  const cargarPlantillas = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/plantillas`);

      setPlantillas(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const CargarReports = async () => {
    try {
      const respo = await axios.get(
        `http://localhost:3000/reportes/paciente/${selectedNote._id}`,
      );
      setReportes(respo.data);
    } catch (error) {}
  };
  const abrirReporte = (plantilla) => {
    window.open(
      `/reports/${selectedNote._id}/${plantilla._id}`,
      "_blank",
      "width=800,height=600,resizable=yes",
    );

    onClose();
  };

  return (
    <dialog ref={dialogref} className="modal">
      <div className="modal-box max-w-4xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-xl mb-2">Reportes realizados</h3>
          <button className="btn btn-sm btn-circle" onClick={onClose}>
            ✕
          </button>
        </div>

        {reportes.length === 0 ? (
          <div className="alert">
            Este paciente no tiene reportes registrados.
          </div>
        ) : (
          <div className="overflow-x-auto mb-6 ">
            <table className="table ">
              <thead>
                <tr>
                  <th>Modalidad</th>
                  <th>Estudio</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {reportes.map((reporte) => (
                  <tr key={reporte._id}>
                    <td>{reporte.plantillaId.modalidad}</td>

                    <td>{reporte.plantillaId.nombre}</td>

                    <td>
                      <button
                        className="btn btn-ghost btn-primary"
                        onClick={() =>
                          window.open(`/reports/${reporte._id}`, 
                            "_blank",  
                            "width=800,height=600,resizable=yes",)
                          
                        }
                      >
                        <Pencil size={18}/>
                        Editar 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div>
          <h3 className="font-bold text-xl ">Seleccionar Plantilla</h3>
          <SearchComponent search={search} setSearch={setSearch} />
        </div>

        <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
          {plantillasFiltradas.map((plantilla) => (
            <button
              key={plantilla._id}
              className="btn btn-outline w-full justify-start"
              onClick={() => abrirReporte(plantilla)}
            >
              {plantilla.modalidad} - {plantilla.nombre}
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default ModalComponente;

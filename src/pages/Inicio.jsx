import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, Pencil, BookText } from "lucide-react";
import List from "../components/List";
import ModalComponente from "../components/ModalComponente";
import NavbarCompo from "../components/NavbarCompo";
import pacienteService from "../services/pacienteService";
import plantillaService from "../services/plantillaServiceClass";

const Inicio = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [reportesDelPaciente, setReportesDelPaciente] = useState([]);
  const [search, setSearch] = useState("");
  
  
  const [listaPacientes, setListaPacientes] = useState([]);
  const [listaPlantillas, setListaPlantillas] = useState([]);

  
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
      
        const pacs = await pacienteService.loadPacientes();
        
        const plants = plantillaService.loadPlantillas 
          ? await plantillaService.loadPlantillas() 
          : plantillaService.All;

        setListaPacientes(pacs);
        setListaPlantillas(plants);
      } catch (error) {
        console.error("Error cargando los datos en Inicio:", error);
      }
    };

    cargarDatosIniciales();
  }, []);

  
  useEffect(() => {
    if (!selectedNote) {
      setReportesDelPaciente([]);
      return;
    }

    const cargarReportes = async () => {
      try {
        const reportes = await pacienteService.getReportes(selectedNote._id);
        setReportesDelPaciente(reportes || []);
      } catch (error) {
        console.error(error);
        setReportesDelPaciente([]);
      }
    };

    cargarReportes();
  }, [selectedNote]);

  const manejarEditarReporte = (reporte) => {
    window.open(
      `/reports/${reporte._id}`,
      "_blank",
      "width=1200,height=820,resizable=yes",
    );
    setSelectedNote(null);
  };

  const manejarSeleccionarPlantilla = (plantilla) => {
    if (!selectedNote) return;
    window.open(
      `/reports/${selectedNote._id}/${plantilla._id}`,
      "_blank",
      "width=1200,height=820,resizable=yes",
    );
    setSelectedNote(null);
  };

  
  const datosFormateadosParaLista = listaPacientes.map((paciente) => ({
    id: paciente._id,
    titulo: paciente.name,
    subtitulo: `Edad: ${paciente.edad}`,
    imagen: "public/image/imagen.png",
    originalData: paciente,
  }));

  const reportesMapeados = reportesDelPaciente.map((rep) => ({
    id: rep._id,
    celda1: rep.plantillaId?.modalidad || "S/M",
    celda2: rep.plantillaId?.nombre || "Sin nombre",
    originalData: rep,
  }));

  const plantillasFiltradasYMapeadas = listaPlantillas
    .filter(
      (p) =>
        p?.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        p?.modalidad?.toLowerCase().includes(search.toLowerCase()),
    )
    .map((p) => ({
      id: p._id,
      textoVisible: `${p.modalidad} - ${p.nombre}`,
      originalData: p,
    }));

  return (
    <div className="w-full">
      <NavbarCompo />

      <div className="max-w-[1540px] mx-auto mt-16 p-4 flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 justify-end">
          <Link
            to="/CreatePage"
            className="btn btn-soft btn-primary font-bold text-[1.1em] flex gap-2"
          >
            <PlusIcon size={18} /> Agregar Nueva Plantilla
          </Link>
          <Link
            to="/editPlantilla"
            className="btn btn-soft btn-primary font-bold text-[1.1em] flex gap-2"
          >
            <Pencil size={18} /> Editar Plantilla
          </Link>
        </div>

        <h1 className="font-bold text-2xl lg:text-3xl my-2">
          Lista de Reportes
        </h1>

        <List
          data={datosFormateadosParaLista}
          onActionClick={(pacienteOriginal) =>
            setSelectedNote(pacienteOriginal)
          }
          textoBoton="Reporte"
          iconoBoton={BookText}
        />
      </div>

      <ModalComponente
        isOpen={!!selectedNote}
        onClose={() => {
          setSelectedNote(null);
          setSearch("");
        }}
        tituloSeccionSuperior="Reportes realizados"
        textoVacioSuperior="Este paciente no tiene reportes registrados."
        columnasTabla={["Modalidad", "Estudio", "Acciones"]}
        datosSuperiores={reportesMapeados}
        onAccionSuperior={manejarEditarReporte}
        tituloSeccionInferior="Seleccionar Plantilla"
        placeholderBuscar="Buscar plantilla..."
        searchValue={search}
        onSearchChange={setSearch}
        datosInferiores={plantillasFiltradasYMapeadas}
        onAccionInferior={manejarSeleccionarPlantilla}
      />
    </div>
  );
};

export default Inicio;
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import Inicio from "./pages/Inicio";
import Reports from "./pages/reports";
import NewPlantilla from "./pages/NewPlantilla";
import EditPlantilla from "./pages/EditPlantilla";


import { pacienteService } from "./services/pacienteService";

const App = () => {
  const [infoPat, setinfoPat] = useState({ ready: false, data: [] });

 
  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const data = await pacienteService.getAll();
        setinfoPat({ ready: true, data });
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
      }
    };
    cargarPacientes();
  }, []);

  if (!infoPat.ready) return <div className="p-10 text-center font-bold">Cargando aplicación.......</div>;

  return (
    <div className="w-full">
      <Routes>
    
        <Route path="/" element={<Inicio data={infoPat.data} />} />
        <Route path="/reports/:paciente_id/:plantilla_id" Component={Reports} />
        <Route path="/reports/:reporte_id" Component={Reports} />
        <Route path="/CreatePage" element={<NewPlantilla />} />
        <Route path="/editPlantilla" element={<EditPlantilla />} />
      </Routes>
      
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default App;
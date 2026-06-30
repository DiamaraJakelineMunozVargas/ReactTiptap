
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Inicio from "./pages/Inicio";
import Reports from "./pages/reports";
import NewPlantilla from "./pages/NewPlantilla";
import EditPlantilla from "./pages/EditPlantilla";
import plantillaService from "./services/plantillaServiceClass";
import pacienteService from "./services/pacienteService";


const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        await Promise.all([
          pacienteService.loadPacientes(),
          plantillaService.loadPlantillas(),
        ]);

        setReady(true);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    cargarDatos();
  }, []);
  if (!ready) {
    return "Cargando";
  }

  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Inicio />} />

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

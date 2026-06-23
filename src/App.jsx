import Inicio from "./pages/ReportPage";
import CreatePage from "./components/Editor-Regex/CreatePage";
import ModalComponente from "./components/ModalComponente";
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Reports from "./pages/reports";
import EditPlantilla from "./pages/EditPlantilla";

const App = () => {
  const [infoPat, setinfoPat] = useState({ // dato paciente 
    ready: false,
    data: [],
  });
  const [selectedNote, setSelectedNote] = useState(null); // paciente seleccionado
  // ESTADO EN REACT 
  /**selectedNote es el valor actual 
   * setSelectedNote es la funcion para cambiar ese valor
   * al inicio selectedNote es = null porque useState esta igual a null 
   * entonces inicialmente significa: selectedNote= null (no hay pacientes seleccionados)
   */

  console.log("Paciente seleccionado actualmente:", selectedNote);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:3000/pacientes`);
        const data = response.data;
        setinfoPat({ ready: true, data });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    })();
  }, []);

  if (!infoPat.ready) return <div>Cargando.......</div>;

  return (
    <>
      
      <div className="w-full ">
        <Routes>
          <Route
            path="/"
            element={
              <Inicio data={infoPat.data} setSelectedNote={setSelectedNote} />
            }
          />
          <Route
            path="/reports/:paciente_id/:plantilla_id"
            Component={Reports}
          />
          <Route path="/reports/:reporte_id" Component={Reports} />
          <Route path="/CreatePage" element={<CreatePage />} />
          <Route path="/editPlantilla" element={<EditPlantilla/>}/>
        </Routes>
        <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"/>
        <ModalComponente
          selectedNote={selectedNote}
          isOpen={!!selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      </div>
    </>
  );
};

export default App;

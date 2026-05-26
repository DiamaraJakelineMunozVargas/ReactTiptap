import Inicio from "./pages/Homepage";
import CrearNote from "./pages/CreateNote";
import ModalComponente from "./components/ModalComponente";
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Reports from "./pages/reports";
const apiurl = import.meta.env.VITE_API_URL;

const App = () => {
  const [infoPat, setinfoPat] = useState({
    ready: false,
    data: [],
  });
  const [selectedNote, setSelectedNote] = useState(null);

  console.log("Nota seleccionada actualmente:", selectedNote);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${apiurl}/pacientes`);
        const data = response.data;
        setinfoPat({ ready: true, data });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    })();
  }, []);

  const handleUpdateNote = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${apiurl}/pacientes/${id}`,
        updatedData,
      );

      setinfoPat((prev) => ({
        ...prev,
        data: prev.data
          ? prev.data.map((n) => (n._id === id ? response.data : n))
          : null,
      }));

      setSelectedNote(response.data);
      alert("Nota actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };
  if (!infoPat.ready) return <div>Cargando.......</div>;

  return (
    <>
      {/* <NavbarCompo selectedNote={selectedNote} onUpdate={handleUpdateNote} /> */}
      <div className="w-full ">
        <Routes>
          <Route
            path="/"
            element={
              <Inicio data={infoPat.data} setSelectedNote={setSelectedNote} />
            }
          />
          <Route path="/reports/:paciente_id/:plantilla_id" Component={Reports} />
          <Route path="/createNote" element={<CrearNote />} />
        </Routes>
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

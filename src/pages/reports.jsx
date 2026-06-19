import { useParams } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useRef } from "react";
import { LifeLine } from "react-loading-indicators";
import {EditorRegex, reemplazarVariables } from "../components/Editor-Regex";


const Reports = () => {
  const [plantilla, setPlantilla] = useState(null); // plantilla = null
  const [paciente, setPaciente] = useState(null); //paciente = null
  const [reporte, setReporte] = useState(null); //reporte = null
  const [ready, setReady] = useState(false); //ready = false  si ya termino de cargar
  const { paciente_id, plantilla_id, reporte_id } = useParams(); // leer los parametros de la URL ;)

  useEffect(() => {
    (async () => {
      try {
        if (reporte_id) {
          // si existe el id del reporte, entonces que edite
          const responseEditar = await axios.get(
            `http://localhost:3000/reportes/${reporte_id}`, // trae un reporte a traves de su id
          );
          console.log(responseEditar.data);
          setReporte(responseEditar.data); // se guarda el reporte ya actualizado
          setPaciente(responseEditar.data.pacId); //paciente= null --setpaciente = reportes/pacienteId
          setPlantilla(responseEditar.data.plantillaId); // plantilla=null -- setplantilla= reportes/Plantilla_id
          setReady(true);
        } else {
          // si no existe el reporte, entonces se crea uno nuevo
          const [responsepaciente, responseplantilla] = await Promise.all([
            //Promise.all = las dos peticiones al mismo tiempo: paciente - plantilla
            axios.get(`http://localhost:3000/pacientes/${paciente_id}`),
            axios.get(`http://localhost:3000/plantillas/${plantilla_id}`),
          ]);
          console.log(responseplantilla.data);
          console.log(responsepaciente.data);

          setPlantilla(responseplantilla.data); // plantilla=null -- setplantilla= datos de la plantilla
          setPaciente(responsepaciente.data); //paciente = null -- setpaciente = datos del paciente seleccionado
          setReporte({
            pacId: responsepaciente.data._id, // pacientes datos
            plantillaId: responseplantilla.data._id, // plantilla datos
            template: responseplantilla.data.template || "", // el template son los datos que se guardaran de los datos de las expresiones regulares
          });

          setReady(true);
        }
      } catch (error) {
        console.error("Error al obtener la plantilla:", error);
      }
    })();
  }, []);

  const handleSave = async () => {
    try {
      if (reporte._id) {
        await axios.put(
          `http://localhost:3000/reportes/${reporte._id}`,
          reporte,
        );
        alert("reporte Actualizado");
      } else {
        console.log(reporte);
        await axios.post("http://localhost:3000/reportes", reporte);

        alert("Guardado correctamente");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "reporte",
  });
  const htmlFinal = reemplazarVariables(
    // se llama al motor regex  paciente: {{paciente.name}}
    reporte?.template || "",

    {
      paciente,
      plantilla,
      fechaActual: new Date().toLocaleDateString(),
      contenido: reporte?.contenido || "",
    },
  );


  if (!ready) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LifeLine
          color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
          size="large"
          text="Cargando"
          textColor="black"
        />
      </div>
    );
  }

  const fechaFormateada = new Date(plantilla.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
     
      <EditorRegex
        initialContent={htmlFinal}
        onChange={(html) =>
          setReporte((prev) => ({
            ...prev,
            template: html,
          }))
        }
        onSave={handleSave}
         fechaFormateada={fechaFormateada}
         Imprimir={handlePrint}
           
      />
    </div>
  );
};

export default Reports;

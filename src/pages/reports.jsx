import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useRef } from "react";
import { LifeLine } from "react-loading-indicators";
import { toast } from "react-toastify";
import { EditorRegex, reemplazarVariables } from "../components/Editor-Regex";

import pacienteService from "../services/pacienteService";
import plantillaServiceClass from "../services/plantillaServiceClass";
import reportService from "../services/reportService";

const Reports = () => {
  const [plantilla, setPlantilla] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [reporte, setReporte] = useState(null);
  const [ready, setReady] = useState(false);



  const { paciente_id, plantilla_id, reporte_id } = useParams();

  useEffect(() => {
    const cargarTodaLaData = async () => {
      try {
        if (reporte_id) {
          await reportService.loadReportes();
          const dataReporte = reportService.ById(reporte_id);

      
          setReporte(dataReporte);
          setPaciente(dataReporte.pacId);
          setPlantilla(dataReporte.plantillaId);
          setReady(true);
        } else {
          const [dataPaciente, dataPlantilla] = await Promise.all([
            pacienteService.ById(paciente_id),
            plantillaServiceClass.ById(plantilla_id),
          ]);

          setPlantilla(dataPlantilla);
          setPaciente(dataPaciente);

          setReporte({
            pacId: dataPaciente._id,
            plantillaId: dataPlantilla._id,
            template: dataPlantilla.template || "",
          });

          setReady(true);
        }
      } catch (error) {
        console.error(
          "Error al obtener los datos en la página de Reportes:",
          error,
        );
        toast.error("Error al cargar los datos médicos.");
      }
    };

    cargarTodaLaData();
  }, [paciente_id, plantilla_id, reporte_id]);

  const handleSave = async () => {
    try {
      if (reporte._id) {
        await reportService.update(reporte._id, reporte);
        toast.success("¡Reporte Actualizado correctamente!");
      } else {
        const nuevoReporte = await reportService.create(reporte);

        setReporte(nuevoReporte);
        toast.success("¡Reporte Guardado con éxito!");
      }
    } catch (error) {
      console.error("Error al guardar el reporte:", error);
      toast.error("Hubo un problema al guardar el reporte.");
    }
  };

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "reporte",
  });

  const htmlFinal = reemplazarVariables(reporte?.template || "", {
    paciente,
    plantilla,
    fechaActual: new Date().toLocaleDateString(),
    contenido: reporte?.contenido || "",
  });

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

  const fechaFormateada = plantilla?.date
    ? new Date(plantilla.date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Sin fecha";

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

      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <div dangerouslySetInnerHTML={{ __html: htmlFinal }} />
        </div>
      </div>
    </div>
  );
};

export default Reports;

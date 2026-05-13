import { useState, useEffect } from "react";
import Tiptap from "./Tiptap";
import { Save } from "lucide-react";

function ContenidoModalTipTap({ selectedNote, onUpdate }) {
    // Estado para guardar 
    const [currentContent, setCurrentContent] = useState("");

    useEffect(() => {
        if (selectedNote) {
            setCurrentContent(selectedNote.content);
        }
    }, [selectedNote]);

    if (!selectedNote) return <p>No hay datos seleccionados</p>;

    const fechaFormateada = new Date(selectedNote.date).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const handleSave = () => {
        onUpdate(selectedNote._id, { content: currentContent });
    };

    return (
        <div className="reporte-documento p-8 bg-white shadow-inner  text-black">
            {/* header  */}
            <div className="reporte-header text-center mb-6">
                <h1 className="text-2xl font-bold underline ">REPORTE DE NOTA</h1>
                <p className="text-sm opacity-60">Fecha de emisión: {fechaFormateada}</p>
            </div>

            <hr className="mb-6" />

            <div className="reporte-seccion mb-6 space-y-2">
                <p><strong>Autor:</strong> {selectedNote.name}</p>
                <p><strong>Asunto:</strong> {selectedNote.title}</p>
            </div>

            {/* contenido */}
            <div className="reporte-contenido border-2 border-dashed border-base-300 p-4 rounded-lg transition-colors">
                <h2 className="font-bold mb-2 text-shadow-black">Contenido:</h2>
                {/* <Tiptap
                    key={selectedNote._id}
                    content={selectedNote.content}
                    editable={true}
                    onChange={setCurrentContent}
                /> */}
            </div>

            {/* --- PIE DE PÁGINA FIJO --- */}
            {/* <div className="reporte-footer mt-12 text-center">
                <div className="inline-block">
                    <p>__________________________</p>
                    <p className="font-semibold">Firma del Responsable</p>
                    <p>{selectedNote.name}</p>
                </div>
            </div> */}

            {/* --- BOTÓN DE ACCIÓN --- */}
            <div className="mt-8 flex justify-center">
                <button
                    className="btn btn-primary btn-wide font-bold"
                    onClick={handleSave}
                >
                    <Save />

                    Guardar Cambios
                </button>
            </div>
        </div>
    );
}

export default ContenidoModalTipTap;
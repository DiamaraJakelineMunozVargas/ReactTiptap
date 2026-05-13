import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import Tiptap from '../componentes/Tiptap'


const Reports = () => {
    const [state, setstate] = useState({
        ready: false,
        nota: null
    })
    const params = useParams()
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/notas/${params.nota_id}`);
                setstate({
                    ready: true,
                    nota: response.data
                })
            } catch (error) {
                console.error("Error al obtener la nota:", error);
            }
        })();
    }, [])

    if (!state.ready) { return <div>Loading...</div> }

    const handleContentChange = (newContent) => {
        setstate(prev => ({
            ...prev,
            nota: { ...prev.nota, content: newContent }
        }));
    };

    const fechaFormateada = new Date(state.nota.date).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    return (

        <div className="bg-gray-200 min-h-screen py-12 flex justify-center text-black">

            <div className="bg-white w-[21cm] min-h-[29.7cm] p-[2.5cm] shadow-2xl ring-1 ring-black/5">


                <div className="text-center border-b-2 border-black pb-6 mb-8">
                    <h1 className="text-3xl font-serif font-bold uppercase tracking-tighter">Reporte Oficial</h1>
                    <p className="text-sm italic">Documento generado vía Sistema de Notas</p>
                    <p className="text-sm opacity-60">Fecha de emisión:  {fechaFormateada}</p>
                </div>


                <div className="mb-6 space-y-2">
                    <p><strong>Nombre:</strong> {state.nota.name}</p>
                    <p><strong>Titulo:</strong> {state.nota.title}</p>
                </div>


                <div className="reporte-contenido ">
                    <h2 className="font-bold mb-2 text-shadow-black">Contenido:</h2>

                    <Tiptap
                        key={state.nota._id}
                        content={state.nota.content}
                        editable={true}
                        onChange={handleContentChange}
                    />
                </div>
            </div>
        </div>

    )
}

export default Reports
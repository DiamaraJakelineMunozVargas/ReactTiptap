import { useState, useEffect } from "react";
import Tiptap from "./Tiptap";
import { Save } from "lucide-react";
import Wordtoolbar from "./Wordtoolbar";
function DocumentoEditor({ editor, nota, fechaFormateada }) {

    return (
        <div>
            <Wordtoolbar editor={editor} />
            <div className="bg-gray-200 min-h-screen py-12 flex justify-center text-black">

                <div className="bg-white w-[21cm] min-h-[29.7cm] p-[2.5cm] shadow-2xl ring-1 ring-black/5">


                    <div className="text-center border-b-2 border-black pb-6 mb-8">
                        <h1 className="text-3xl font-serif font-bold uppercase tracking-tighter">Reporte Oficial</h1>
                        <p className="text-sm italic">Documento generado vía Sistema de Notas</p>
                        <p className="text-sm opacity-60">Fecha de emisión:  {fechaFormateada}</p>
                    </div>


                    <div className="mb-6 space-y-2">
                        <p><strong>Nombre:</strong> {nota.name}</p>
                        <p><strong>Titulo:</strong> {nota.title}</p>
                    </div>


                    <div className="reporte-contenido ">
                        <h2 className="font-bold mb-2 text-shadow-black">Contenido:</h2>
                        <Tiptap editor={editor} />
                        {/* <Tiptap
                key={state.nota._id}
                content={state.nota.content}
                editable={true}
                onChange={handleContentChange}
            /> */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DocumentoEditor;
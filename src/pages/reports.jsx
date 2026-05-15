import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import DocumentoEditor from '../components/DocumentoEditor'

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


    const handleContentChange = (newContent) => {
        setstate(prev => ({
            ...prev,
            nota: { ...prev.nota, content: newContent }
        }));
    };

    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        onUpdate: ({ editor }) => {
            handleContentChange(editor.getText())
        },
    })
    const handleSave = async () => {

        try {

            await axios.put(
                `http://localhost:3000/notas/${params.nota_id}`,
                state.nota
            )

            alert("Guardado correctamente")

        } catch (error) {

            console.error(error)

        }
    }
    useEffect(() => {
        if (
            editor &&
            state.nota?.content &&
            editor.isEmpty
        ) {
            editor.commands.setContent(state.nota.content)
        }

    }, [editor, state.nota?.content])
    if (!state.ready) { return <div>Loading...</div> }

    const fechaFormateada = new Date(state.nota.date).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (


        <div>
            <DocumentoEditor

                editor={editor}
                nota={state.nota}
                fechaFormateada={fechaFormateada}
                handleSave={handleSave} />
            {/* <Tiptap
                key={state.nota._id}
                content={state.nota.content}
                editable={true}
                onChange={handleContentChange}
            /> */}
        </div>



    )
}

export default Reports
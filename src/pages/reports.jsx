import { useParams } from 'react-router-dom'
import axios from "axios"
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DocumentoEditor from '../components/DocumentoEditor'
import { useReactToPrint } from "react-to-print"
import { useState, useEffect, useRef } from 'react'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import ResizeImage from 'tiptap-extension-resize-image'
import FontSize from '../extensions/FontSize'
import { UnderlineStyle } from '../extensions/Underline'

const Reports = () => {
    const [state, setstate] = useState({
        ready: false,
        nota: null
    })
    const params = useParams()
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/plantillas/${params.plantilla_id}`);
                console.log(response.data);
                setstate({
                    ready: true,
                    nota: response.data
                })
            } catch (error) {
                console.error("Error al obtener la plantilla:", error);
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
        extensions: [StarterKit, TextStyle, FontFamily, FontSize, UnderlineStyle, ResizeImage],
        content: "",
        onUpdate: ({ editor }) => {
            handleContentChange(editor.getHTML())
        },
        editorProps:{
            handlePaste(view, event) {

            const items = event.clipboardData?.items

            if (!items) return false

            for (const item of items) {

                if (item.type.startsWith('image')) {

                    const file = item.getAsFile()

                    const reader = new FileReader()

                    reader.onload = () => {

                        const src = reader.result

                        editor.chain().focus().setImage({
                            src,
                        }).run()
                    }

                    reader.readAsDataURL(file)

                    return true
                }
            }

            return false
        },
        }
    })
    const handleSave = async () => {

        try {

            await axios.put(
                `http://localhost:3000/plantillas/${params.plantilla_id}`,
                state.nota
            )

            alert("Guardado correctamente")

        } catch (error) {

            console.error(error)

        }
    }
    const printRef = useRef(null)
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "reporte"
    })
    useEffect(() => {
        if (
            editor &&
            state.nota?.content &&
            editor.isEmpty
        ) {
            editor.commands.setContent(state.nota.contenido)
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
                handleSave={handleSave}
                handlePrint={handlePrint}
                printRef={printRef}

            />
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
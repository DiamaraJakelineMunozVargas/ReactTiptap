import { EditorContent, EditorContext } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'

import { useMemo } from 'react'
import "./styles/styletiptap.css"


const Tiptap = ({ editor }) => {



    const providerValue = useMemo(() => ({ editor }), [editor])

    if (!editor) return null;

    return (
        <EditorContext.Provider value={providerValue}>



            <EditorContent editor={editor} />



            <FloatingMenu editor={editor}></FloatingMenu>
            <BubbleMenu editor={editor}></BubbleMenu>
        </EditorContext.Provider>
    )
}

export default Tiptap
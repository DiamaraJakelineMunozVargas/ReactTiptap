import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo, useEffect } from 'react'
import "../styles/styletiptap.css";


const Tiptap = ({ content, editable, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        editable: editable,
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getText());
            }
        },
    });
    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
        }
    }, [editable, editor]);
    useEffect(() => {
        if (editor && content) {
            editor.commands.focus();
        }
    })
    useEffect(() => {
        if (editor && content) {

            editor.commands.setContent(content);
        }
    }, [content, editor]);

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
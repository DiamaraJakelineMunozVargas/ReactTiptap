import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo, useEffect } from 'react'

import Toolbar from './Wordtoolbar';

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
        if (editor && content !== editor.getText()) {

            editor.commands.setContent(content);
        }
    }, [content, editor]);

    const providerValue = useMemo(() => ({ editor }), [editor])

    if (!editor) return null;

    return (
        <EditorContext.Provider value={providerValue}>
            <div className='sticky top-0 z-50 bg-white border-b mb-6 p-2 flex gap-2'>
                <Toolbar editor={editor} />
            </div>
            <div >
                <EditorContent editor={editor} />
            </div>


            <FloatingMenu editor={editor}></FloatingMenu>
            <BubbleMenu editor={editor}></BubbleMenu>
        </EditorContext.Provider>
    )
}

export default Tiptap
import "../styles/toolbar.css"
import { Undo2, Redo2, Bold, Italic, List, ListOrdered, Underline, Save } from "lucide-react"
const Wordtoolbar = ({ editor, handleSave }) => {


    if (!editor) return null
    return (
        <div className="sticky top-0 z-50 backdrop-blur bg-base-100/90 border-b border-base-300 shadow-sm ">
            <div className='flex flex-wrap gap-2 p-3 items-center'>
                <div className="flex gap-1 border-r pr-3 ">

                    <button type="button" className="btn btn-sm btn-ghost"
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        <Undo2 size={20} />
                    </button>
                    <button type="button" className="btn btn-sm btn-ghost"
                        onClick={() => editor.chain().focus().redo().run()}
                    >
                        <Redo2 size={20} />
                    </button>

                </div>
                <div className="flex gap-1 border-r pr-3">
                    <button
                        className={`btn btn-sm ${editor.isActive('bold')
                            ? 'btn-neutral'
                            : 'btn-ghost'
                            }`}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <Bold size={18} />
                    </button>
                    <button
                        className={`btn btn-sm ${editor.isActive('italic') ? 'btn-neutral' : 'btn-ghost'}`}
                        onClick={() => editor.chain().focus().toggleItalic().run()}

                    >
                        <Italic size={18} />
                    </button>
                    <button className={`btn btn-sm ${editor.isActive('underline') ? 'btn-neutral' : 'btn-ghost'}`}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}>
                        <Underline size={18} />
                    </button>
                </div>
                <div className="flex gap-1">

                    <button
                        className="btn btn-sm btn-ghost"
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        <List size={18} />
                    </button>

                    <button
                        className="btn btn-sm btn-ghost"
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        <ListOrdered size={18} />
                    </button>
                </div>
                <div className="flex ml-auto gap-5">
                    <button className="btn btn-soft btn-ghost font-bold" onClick={handleSave}>
                        <Save size={18} /> Guardar
                    </button>
                </div>
            </div>
        </div >

    )
}
export default Wordtoolbar
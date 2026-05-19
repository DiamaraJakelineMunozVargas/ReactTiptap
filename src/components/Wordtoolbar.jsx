import "../styles/toolbar.css"
import { Undo2, Redo2, Bold, Italic, List, ListOrdered, Underline, Save, FileDown } from "lucide-react"
const Wordtoolbar = ({ editor, handleSave, handlePrint }) => {


    if (!editor) return null
    return (
        <div className="sticky top-0 z-50 bg-[#f3f3f3] border-b border-gray-300 shadow-sm">

            <div className="flex items-center gap-2 px-4 py-2 flex-wrap">

                {/* Undo / Redo */}
                <div className="flex items-center gap-1 pr-3 border-r border-gray-300">

                    <button
                        className="toolbar-btn"
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        <Undo2 size={18} />
                    </button>

                    <button
                        className="toolbar-btn"
                        onClick={() => editor.chain().focus().redo().run()}
                    >
                        <Redo2 size={18} />
                    </button>

                </div>

                {/* Fuente */}
                <div className="flex items-center gap-2 pr-3 border-r border-gray-300">

                    <select
                        className="toolbar-select w-40"
                        onChange={(e) =>
                            editor.chain().focus().setFontFamily(e.target.value).run()
                        }
                    >
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                    </select>

                    <select
                        className="toolbar-select w-20"
                        onChange={(e) =>
                            editor.chain().focus().setFontSize(e.target.value).run()
                        }
                        defaultValue="16px"
                    >
                        <option value="12px">12</option>
                        <option value="14px">14</option>
                        <option value="16px">16</option>
                        <option value="18px">18</option>
                        <option value="24px">24</option>
                        <option value="32px">32</option>
                    </select>

                </div>

                {/* Bold / Italic / Underline */}
                <div className="flex items-center gap-1 pr-3 border-r border-gray-300">

                    <button
                        className={`toolbar-btn ${editor.isActive('bold') ? 'active-toolbar-btn' : ''
                            }`}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <Bold size={18} />
                    </button>

                    <button
                        className={`toolbar-btn ${editor.isActive('italic') ? 'active-toolbar-btn' : ''
                            }`}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <Italic size={18} />
                    </button>

                    <button
                        className={`toolbar-btn ${editor.isActive('underline') ? 'active-toolbar-btn' : ''
                            }`}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <Underline size={18} />
                    </button>

                </div>

                {/* Listas */}
                <div className="flex items-center gap-1">

                    <button
                        className="toolbar-btn"
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        <List size={18} />
                    </button>

                    <button
                        className="toolbar-btn"
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        <ListOrdered size={18} />
                    </button>

                </div>

                {/* Save */}
                <div className="ml-auto flex gap-2">

                    <button className="toolbar-action-btn" onClick={handlePrint}>
                        <FileDown size={16} />
                        Imprimir
                    </button>

                    <button className="toolbar-action-btn" onClick={handleSave}>
                        <Save size={16} />
                        Guardar
                    </button>

                </div>
            </div>
        </div>
    )
}
export default Wordtoolbar

import "../styles/toolbar.css"
const Wordtoolbar = ({ editor }) => {
    return (
        <div className='flex gap-2'>
            <div className="button-group ">
                <button type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    H1
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    H2
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    H3
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    Paragraph
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    Bold
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    Italic
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={editor.isActive('highlight') ? 'is-active' : ''}
                >
                    Highlight
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                >
                    Left
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                >
                    Center
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                    Right
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                >
                    Justify
                </button>
            </div>
        </div>
    )
}
export default Wordtoolbar
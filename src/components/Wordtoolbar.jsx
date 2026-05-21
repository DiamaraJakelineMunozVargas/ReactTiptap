import "../styles/toolbar.css";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline,
  Save,
  FileDown,
} from "lucide-react";
import FontFamilySelect from "./componentsWord/FontFamilySelect";
import FontSizeSelect from "./componentsWord/FontSizeSelect";

const Wordtoolbar = ({ editor, handleSave, handlePrint }) => {
  if (!editor) return null;
  const underlineOptions = [
    { label: "Simple", style: "solid" },
    { label: "Doble", style: "double" },
    { label: "Punteado", style: "dotted" },
    { label: "Guiones", style: "dashed" },
    { label: "Ondulado", style: "wavy" },
  ];
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

        {/* Fuente y tamaño de fuente*/}

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 pr-3 border-b border-r border-gray-300 pb-2">
            <FontFamilySelect editor={editor} />
            <FontSizeSelect editor={editor}/>
          </div>

          {/* Bold / Italic / Underline */}
          <div className="flex items-center gap-1 pr-3 border-r border-gray-300">
            <button
              className={`toolbar-btn ${
                editor.isActive("bold") ? "active-toolbar-btn" : ""
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={18} />
            </button>

            <button
              className={`toolbar-btn ${
                editor.isActive("italic") ? "active-toolbar-btn" : ""
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={18} />
            </button>
            <div className="relative group">
              <button className="toolbar-btn">
                <Underline size={18} />
              </button>

              <div className="absolute hidden group-hover:flex flex-col bg-white border shadow-md rounded-md p-2 z-50 min-w-[180px]">
                {underlineOptions.map((item) => (
                  <button
                    key={item.style}
                    onClick={() =>
                      editor.chain().focus().setUnderlineStyle(item.style).run()
                    }
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    {/* Preview */}
                    <span
                      className="w-16"
                      style={{
                        textDecorationLine: "underline",
                        textDecorationStyle: item.style,
                      }}
                    >
                      ABC
                    </span>

                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Listas */}
        <div className="flex items-center gap-1">
          <button
            className="toolbar-btn"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={18} />
          </button>

          <button
            className="toolbar-btn"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
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
  );
};
export default Wordtoolbar;

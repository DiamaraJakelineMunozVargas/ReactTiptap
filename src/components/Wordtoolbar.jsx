import "../styles/toolbar.css";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Save,
  FileDown,
} from "lucide-react";

// Tus componentes modulares de Word
import FontFamilySelect from "./componentsWord/FontFamilySelect";
import FontSizeSelect from "./componentsWord/FontSizeSelect";
import HeadingSelect from "./componentsWord/HeadingSelect";
import TextAlignGroup from "./componentsWord/TextAlignGroup";
import FontColorPicker from "./componentsWord/FontColorPicker";
import UnderlineSelect from "./componentsWord/UnderlineSelect";

const Wordtoolbar = ({ editor, handleSave, handlePrint }) => {
  if (!editor) return null;

  return (
    <div className="sticky top-0 z-50 bg-[#f3f3f3] border-b border-gray-300 shadow-sm text-black select-none">
      <div className="flex items-center gap-4 px-4 py-1.5 overflow-visible select-none scrollbar-none snap-x whitespace-nowrap ">
        <div className="flex items-center gap-1 pr-3 border-r border-gray-300 h-10">
          <button
            className="p-1.5 hover:bg-gray-200 rounded text-gray-700"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 size={16} />
          </button>
          <button
            className="p-1.5 hover:bg-gray-200 rounded text-gray-700"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-1 pr-3 border-r border-gray-300 pb-1">
          <div className="flex items-center gap-2">
            <FontFamilySelect editor={editor} />
            <FontSizeSelect editor={editor} />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              className={`p-1 rounded text-sm font-bold w-7 h-7 flex items-center justify-center ${editor.isActive("bold") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={15} />
            </button>
            <button
              className={`p-1 rounded w-7 h-7 flex items-center justify-center ${editor.isActive("italic") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={15} />
            </button>
            <UnderlineSelect editor={editor} />
            <FontColorPicker editor={editor} />
          </div>
        </div>

        <div className="flex flex-col gap-1 pr-3 border-r border-gray-300 pb-1">
          <div className="flex items-center gap-1">
            <button
              className={`p-1 rounded ${editor.isActive("bulletList") ? "bg-blue-100" : "hover:bg-gray-200"}`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={16} />
            </button>
            <button
              className={`p-1 rounded ${editor.isActive("orderedList") ? "bg-blue-100" : "hover:bg-gray-200"}`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered size={16} />
            </button>
          </div>

          <TextAlignGroup editor={editor} />
        </div>

        <div className="flex items-center pr-3 border-r border-gray-300 h-10">
          <HeadingSelect editor={editor} />
        </div>

        <div className="ml-auto flex items-center gap-1 h-full">
          <button
            className="flex flex-col items-center justify-center gap-1 bg-transparent hover:bg-gray-200 ctive:bg-gray-300 w-16 h-16 rounded-md transition-all text-gray-700 border border-transparent hover:border-gray-300 group"
            onClick={handlePrint}
            title="Imprimir documento"
          >
            <FileDown
              size={22}
              className="text-blue-600 group-hover:scale-110 transition-transform"
            />
            <span className="text-[12px] font-medium leading-none text-center">
              Imprimir
            </span>
          </button>

          <div className="w-px bg-gray-300 h-10 mx-1" />

          <button
            className="flex flex-col items-center justify-center gap-1 bg-transparent hover:bg-gray-200 active:bg-gray-300 w-16 h-16 rounded-md transition-all text-gray-700 border border-transparent hover:border-gray-300 group"
            onClick={handleSave}
            title="Guardar todos los cambios"
          >
            <Save
              size={22}
              className="text-emerald-600 group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] font-medium leading-none text-center">
              Guardar
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wordtoolbar;

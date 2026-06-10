import React from "react";
import "../styles/toolbar.css";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Save,
  Printer,
} from "lucide-react";

// Tus componentes modulares previos
import FontFamilySelect from "./componentsWord/FontFamilySelect";
import FontSizeSelect from "./componentsWord/FontSizeSelect";
import HeadingSelect from "./componentsWord/HeadingSelect";
import TextAlignGroup from "./componentsWord/TextAlignGroup";
import FontColorPicker from "./componentsWord/FontColorPicker";
import UnderlineSelect from "./componentsWord/UnderlineSelect";


import FontSizeAdjust from "./componentsWord/FontSizeAdjust";


const Wordtoolbar = ({ editor, handleSave, handlePrint }) => {
  if (!editor) return null;

  return (
    <div className="sticky top-0 z-50 bg-[#edebe9] border-b border-[#d2d0ce] shadow-sm text-black select-none font-sans">
      <div className="flex items-center gap-3 px-4 py-2 overflow-visible select-none scrollbar-none snap-x whitespace-nowrap">
        
        {/* Historial - Deshacer / Rehacer */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[#d2d0ce]">
          <button
            className="p-1.5 hover:bg-[#f3f2f1] active:bg-[#e1dfdd] rounded text-[#323130]"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 size={15} />
          </button>
          <button
            className="p-1.5 hover:bg-[#f3f2f1] active:bg-[#e1dfdd] rounded text-[#323130]"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 size={15} />
          </button>
        </div>

        {/* BLOQUE DE FUENTE (Ajustado idéntico a image_737406.png) */}
        <div className="flex flex-col gap-1.5 pr-3 border-r border-[#d2d0ce]">
          
          {/* Fila Superior: Tipografías, Tamaños y Botones de incremento */}
          <div className="flex items-center gap-1.5">
            <FontFamilySelect editor={editor} />
            <FontSizeSelect editor={editor} />
            {/* Agregado: Las A▲ A▼ */}
            <FontSizeAdjust editor={editor} /> 
          </div>

          {/* Fila Inferior: Formatos y Efectos */}
          <div className="flex items-center gap-1">
            <button
              className={`p-1 rounded text-xs font-bold w-7 h-6.5 flex items-center justify-center border transition-all ${
                editor.isActive("bold") ? "bg-[#e1dfdd] border-[#8a8886]" : "bg-transparent border-transparent hover:bg-[#f3f2f1]"
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={14} />
            </button>
            
            <button
              className={`p-1 rounded w-7 h-6.5 flex items-center justify-center border transition-all ${
                editor.isActive("italic") ? "bg-[#e1dfdd] border-[#8a8886]" : "bg-transparent border-transparent hover:bg-[#f3f2f1]"
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={14} />
            </button>
            
            <UnderlineSelect editor={editor} />
            
            {/* NUEVO: Botón de Tachado (abc) */}
            <button
              className={`p-1 rounded w-7 h-6.5 flex items-center justify-center text-xs border transition-all line-through font-serif ${
                editor.isActive("strike") ? "bg-[#e1dfdd] border-[#8a8886]" : "bg-transparent border-transparent hover:bg-[#f3f2f1]"
              }`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Tachado"
            >
              abc
            </button>

            <div className="w-px bg-[#d2d0ce] h-4 mx-0.5" />

        

            {/* Selector de color de Fuente normal */}
            <FontColorPicker editor={editor} />
          </div>
        </div>

        {/* Bloque de Párrafo: Listas y Alineación */}
        <div className="flex flex-col gap-1.5 pr-3 border-r border-[#d2d0ce]">
          <div className="flex items-center gap-1">
            <button
              className={`p-1 rounded border transition-all ${editor.isActive("bulletList") ? "bg-[#e1dfdd] border-[#8a8886]" : "bg-transparent border-transparent hover:bg-[#f3f2f1]"}`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={15} />
            </button>
            <button
              className={`p-1 rounded border transition-all ${editor.isActive("orderedList") ? "bg-[#e1dfdd] border-[#8a8886]" : "bg-transparent border-transparent hover:bg-[#f3f2f1]"}`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered size={15} />
            </button>
          </div>
          <TextAlignGroup editor={editor} />
        </div>

        {/* Bloque de Estilos (Títulos) */}
        <div className="flex items-center pr-3 border-r border-[#d2d0ce]">
          <HeadingSelect editor={editor} />
        </div>

        {/* Botones de acción del sistema */}
        <div className="ml-auto flex items-center gap-2">
          <button
            className="flex flex-col items-center justify-center gap-0.5 bg-transparent hover:bg-[#f3f2f1] active:bg-[#e1dfdd] w-12 h-12 rounded border border-transparent hover:border-[#d2d0ce] text-[#323130] transition-all"
            onClick={handlePrint}
          >
            <Printer size={18} className="text-[#0078d4]" />
            <span className="text-[10px] font-medium">Imprimir</span>
          </button>

          <button
            className="flex flex-col items-center justify-center gap-0.5 bg-transparent hover:bg-[#f3f2f1] active:bg-[#e1dfdd] w-12 h-12 rounded border border-transparent hover:border-[#d2d0ce] text-[#323130] transition-all"
            onClick={handleSave}
          >
            <Save size={18} className="text-[#107c41]" />
            <span className="text-[10px] font-medium">Guardar</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Wordtoolbar;
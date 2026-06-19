import React from "react";
import "./styles/toolbar.css";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Save,
  Printer,
  FileText,
  AlignLeft,
  AlignRight,
  Maximize2
} from "lucide-react";

import FontFamilySelect from "./componentsWord/FontFamilySelect";
import FontSizeSelect from "./componentsWord/FontSizeSelect";
import HeadingSelect from "./componentsWord/HeadingSelect";
import TextAlignGroup from "./componentsWord/TextAlignGroup";
import FontColorPicker from "./componentsWord/FontColorPicker";
import UnderlineSelect from "./componentsWord/UnderlineSelect";
import FontSizeAdjust from "./componentsWord/FontSizeAdjust";
import HighlightButton from "./componentsWord/HighlightButton";
import SuperscriptButton from "./componentsWord/SuperscriptButton";
import SubscriptButton from "./componentsWord/SubscriptButton";
import HorizontalRuleButton from "./componentsWord/HorizontalRuleButton";
import InsertVariableSelect from "./componentsWord/InsertVariableSelect";
import InsertImageButton from "./componentsWord/InsertImageButton";

const Wordtoolbar = ({ editor, handleSave, handlePrint, variables }) => {
  if (!editor) return null;



const isImageActive = editor.isActive("image") || 
                      editor.isActive("resizeImage") || 
                      editor.state.selection.node?.type.name === 'resizeImage' ||
                      editor.state.selection.node?.type.name === 'image';
const currentImageStyle = editor.getAttributes("image").style || editor.getAttributes("resizeImage").style || "";
const imageNodeName = editor.isActive("resizeImage") ? "resizeImage" : "image";

  return (
    <div className="bg-[#f3f2f1] border-b border-[#d2d0ce] text-black select-none font-sans shadow-sm w-full">
      <div className="flex flex-wrap items-stretch gap-0 px-2 py-1.5 overflow-visible">
        
        {/* GRUPO: DESHACER / REHACER */}
        <div className="word-ribbon-group pl-1">
          <div className="word-ribbon-row justify-center h-full gap-1">
            <button
              className="word-btn-sm"
              onClick={() => editor.chain().focus().undo().run()}
              title="Deshacer (Ctrl+Z)"
            >
              <Undo2 size={14} />
            </button>
            <button
              className="word-btn-sm"
              onClick={() => editor.chain().focus().redo().run()}
              title="Rehacer (Ctrl+Y)"
            >
              <Redo2 size={14} />
            </button>
          </div>
          <span className="word-group-label">Historial</span>
        </div>

        {/* GRUPO: FUENTE (Estructura de doble fila perfecta) */}
        <div className="word-ribbon-group">
          {/* Fila Superior */}
          <div className="word-ribbon-row gap-1">
            <FontFamilySelect editor={editor} />
            <FontSizeSelect editor={editor} />
            <FontSizeAdjust editor={editor} />
          </div>
          {/* Fila Inferior */}
          <div className="word-ribbon-row gap-0.5 mt-1">
            <button
              className={`word-btn-sm font-bold ${editor.isActive("bold") ? "active" : ""}`}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Negrita"
            >
              <Bold size={13} />
            </button>

            <button
              className={`word-btn-sm ${editor.isActive("italic") ? "active" : ""}`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Cursiva"
            >
              <Italic size={13} />
            </button>

            <UnderlineSelect editor={editor} />
            <HighlightButton editor={editor} />
            <SubscriptButton editor={editor} />
            <SuperscriptButton editor={editor} />

            <button
              className={`word-btn-sm text-xs line-through font-serif ${editor.isActive("strike") ? "active" : ""}`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Tachado"
            >
              abc
            </button>

            <div className="w-px bg-[#d2d0ce] h-3.5 mx-1" />
            <FontColorPicker editor={editor} />
          </div>
          <span className="word-group-label">Fuente</span>
        </div>

        {/* GRUPO: PÁRRAFO */}
        <div className="word-ribbon-group">
          <div className="word-ribbon-row gap-1">
            <button
              className={`word-btn-sm ${editor.isActive("bulletList") ? "active" : ""}`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Lista con viñetas"
            >
              <List size={14} />
            </button>
            <button
              className={`word-btn-sm ${editor.isActive("orderedList") ? "active" : ""}`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Lista numerada"
            >
              <ListOrdered size={14} />
            </button>
          </div>
          <div className="word-ribbon-row mt-1">
            <TextAlignGroup editor={editor} />
          </div>
          <span className="word-group-label">Párrafo</span>
        </div>

        {/* GRUPO: ESTILOS */}
        <div className="word-ribbon-group justify-center gap-1">
          <div className="flex items-center h-full">
            <HeadingSelect editor={editor} />
          </div>
          <span className="word-group-label">Estilos</span>
        </div>

        {/* GRUPO: INSERTAR ELEMENTOS */}
        <div className="word-ribbon-group">
          <div className="word-ribbon-row justify-center items-center h-full gap-1.5">
            <HorizontalRuleButton editor={editor} />
            <InsertVariableSelect editor={editor} variables={variables} />
          </div>
          <span className="word-group-label">Insertar</span>
        </div>

        {/* 🔲 DINÁMICO: CONFIGURACIÓN CUADRADA DE IMAGEN */}
        {isImageActive && (
          <div className="word-ribbon-group bg-[#e1dfdd] animate-fade-in border border-[#a1a09f] mx-1 rounded px-1">
            <div className="word-ribbon-row gap-1 justify-center h-full">
              <button
                className={`word-btn-sm ${currentImageStyle.includes("float: left") ? "active bg-white" : "bg-transparent"}`}
              onClick={() => editor.chain().focus().updateAttributes(imageNodeName, { style: "float: left;" }).run()}
                title="Ajuste Cuadrado Izquierda"
              >
                <AlignLeft size={13} className="text-[#0078d4]" />
                <span className="text-[10px] ml-0.5 font-bold">Izq</span>
              </button>

              <button
                className={`word-btn-sm ${currentImageStyle.includes("float: right") ? "active bg-white" : "bg-transparent"}`}
               onClick={() => editor.chain().focus().updateAttributes(imageNodeName, { style: "float: left;" }).run()}
                title="Ajuste Cuadrado Derecha"
              >
                <span className="text-[10px] mr-0.5 font-bold">Der</span>
                <AlignRight size={13} className="text-[#0078d4]" />
              </button>

              <button
                className={`word-btn-sm ${(!currentImageStyle.includes("float: left") && !currentImageStyle.includes("float: right")) ? "active bg-white" : "bg-transparent"}`}
                onClick={() => editor.chain().focus().updateAttributes(imageNodeName, { style: "float: left;" }).run()}
                title="Alineado en línea (Normal)"
              >
                <Maximize2 size={12} />
              </button>
            </div>
            <span className="word-group-label font-bold text-[#0078d4]">Ajuste de Imagen</span>
          </div>
        )}

        {/* BOTONES DE ACCIÓN GLOBAL (MÁRGEN DERECHO) */}
        <div className="ml-auto flex items-center gap-1.5 pl-3">
          <div className="flex flex-col items-center">
            <InsertImageButton editor={editor} />
          </div>
          
          <div className="w-px bg-[#d2d0ce] h-10 mx-1" />

          <button
            className="flex flex-col items-center justify-center bg-transparent hover:bg-[#eaeaea] active:bg-[#e1dfdd] w-14 h-14 rounded border border-transparent hover:border-[#d2d0ce] text-[#323130] transition-all"
            onClick={handlePrint}
          >
            <Printer size={16} className="text-[#0078d4]" />
            <span className="text-[10px] font-semibold mt-1">Imprimir</span>
          </button>

          <button
            className="flex flex-col items-center justify-center bg-transparent hover:bg-[#eaeaea] active:bg-[#e1dfdd] w-14 h-14 rounded border border-transparent hover:border-[#d2d0ce] text-[#323130] transition-all"
            onClick={handleSave}
          >
            <Save size={16} className="text-[#107c41]" />
            <span className="text-[10px] font-semibold mt-1">Guardar</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Wordtoolbar;
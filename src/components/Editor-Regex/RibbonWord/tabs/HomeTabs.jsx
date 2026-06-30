import React from "react";
import FontFamilySelect from "../componentsWord/FontFamilySelect";
import RibbonGroup from "../RibbonGroup";
import FontSizeSelect from "../componentsWord/FontSizeSelect";
import FontColorPicker from "../componentsWord/FontColorPicker";
import TextAlignGroup from "../componentsWord/TextAlignGroup";
import BoldButton from "../componentsWord/BoldButton";
import ItalicButton from "../componentsWord/ItalicButton";
import StrikeButton from "../componentsWord/StrikeButton";
import InsertVariableSelect from "../componentsWord/InsertVariableSelect";
import HighlightButton from "../componentsWord/HighlightButton";
import FontSizeAdjust from "../componentsWord/FontSizeAdjust";
import SubscriptButton from "../componentsWord/SubscriptButton";
import SuperscriptButton from "../componentsWord/SuperscriptButton";
import UnderlineSelect from "../componentsWord/UnderlineSelect";
import { Printer, Save } from "lucide-react";
import Redo from "../componentsWord/Redo";
import Undo from "../componentsWord/Undo";
import BulletListButton from "../BulletListButton";

const HomeTabs = ({ editor, handleSave, handlePrint, variables }) => {
  return (
    <>
      <RibbonGroup title="">
        <Undo editor={editor}/>
        <Redo editor={editor} />
      </RibbonGroup>
      <RibbonGroup title="Fuente">
        <FontFamilySelect editor={editor} />
        <FontSizeSelect editor={editor} />
        <FontColorPicker editor={editor} />
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <StrikeButton editor={editor} />
        <FontSizeAdjust editor={editor} />
        <HighlightButton editor={editor} />
        <SubscriptButton editor={editor} />
        <SuperscriptButton editor={editor} />
        <UnderlineSelect editor={editor} />
      </RibbonGroup>
      <RibbonGroup title="Párrafo">
        <TextAlignGroup editor={editor} />
        <BulletListButton editor={editor}/>
      </RibbonGroup>
      <RibbonGroup title="Acciones">
        <InsertVariableSelect editor={editor} variables={variables} />
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
      </RibbonGroup>
    </>
  );
};

export default HomeTabs;

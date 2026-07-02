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

import BulletListButton from "../componentsWord/BulletListButton";
import OrderedListButton from "../componentsWord/OrderedListButton";

const HomeTabs = ({ editor, variables }) => {
  return (
    <>
    
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
        <OrderedListButton editor={editor}/>
      </RibbonGroup>
      <RibbonGroup title="Acciones">
        <InsertVariableSelect editor={editor} variables={variables} />
      

     
      </RibbonGroup>
    </>
  );
};

export default HomeTabs;

import React from "react";
import RibbonButton from "../RibbonButton";
import { Undo2 } from "lucide-react";

const Undo = ({ editor }) => {
  return (
    <RibbonButton
    
      onClick={() => editor.chain().focus().undo().run()}
      title="Deshacer (Ctrl+Z)"
    >
      <Undo2 size={13} />
    </RibbonButton>
  );
};

export default Undo;

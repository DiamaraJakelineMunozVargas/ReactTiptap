import React from "react";
import RibbonButton from "../RibbonButton";
import { Redo2 } from "lucide-react";

const Redo = ({ editor }) => {
  return (
    <RibbonButton
      onClick={() => editor.chain().focus().redo().run()}
      title="Rehacer (Ctrl+Y)"
    >
      <Redo2 size={13} />
    </RibbonButton>
  );
};

export default Redo;

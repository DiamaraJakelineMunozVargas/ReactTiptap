import React from "react";
import RibbonButton from "../RibbonButton";
import { Bold } from "lucide-react";

const BoldButton = ({ editor }) => {
  return (
    <RibbonButton
      active={editor.isActive("bold")}
      title="Negrita"
      onClick={() => editor.chain().focus().toggleBold().run()}
    >
      <Bold size={13} />
    </RibbonButton>
  );
};

export default BoldButton;

import React from "react";
import RibbonButton from "../RibbonButton";
import { Italic } from "lucide-react";

const ItalicButton = ({ editor }) => {
  return (
    <RibbonButton
      active={editor.isActive("italic")}
      title="Cursiva"
      onClick={() => editor.chain().focus().toggleItalic().run()}
    >
      <Italic size={13} />
    </RibbonButton>
  );
};

export default ItalicButton;

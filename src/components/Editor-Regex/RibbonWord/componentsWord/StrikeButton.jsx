import React from "react";
import RibbonButton from "../RibbonButton";
import { Strikethrough } from "lucide-react";

const StrikeButton = ({ editor }) => {
  return (
    <RibbonButton
      active={editor.isActive("strike")}
      title="Tachado"
      onClick={() => editor.chain().focus().toggleStrike().run()}
    >
      <Strikethrough size={13} />
    </RibbonButton>
  );
};

export default StrikeButton;

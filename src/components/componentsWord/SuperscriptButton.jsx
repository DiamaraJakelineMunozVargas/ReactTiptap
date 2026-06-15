import React from "react";
import { Superscript } from "lucide-react";

const SuperscriptButton = ({ editor }) => {
  return (
    <button
      className={`p-1 rounded w-7 h-6.5 flex items-center justify-center border transition-all ${
        editor.isActive("superscript")
          ? "bg-[#e1dfdd] border-[#8a8886]"
          : "bg-transparent border-transparent hover:bg-[#f3f2f1]"
      }`}
      onClick={() =>
        editor.chain().focus().toggleSuperscript().run()
      }
      title="Superíndice"
    >
      <Superscript />
    </button>
  );
};

export default SuperscriptButton;
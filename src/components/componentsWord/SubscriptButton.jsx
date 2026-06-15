import React from "react";
import { Subscript } from "lucide-react";

const SubscriptButton = ({ editor }) => {
  return (
    <button
      className={`p-1 rounded w-7 h-6.5 flex items-center justify-center border transition-all ${
        editor.isActive("subscript")
          ? "bg-[#e1dfdd] border-[#8a8886]"
          : "bg-transparent border-transparent hover:bg-[#f3f2f1]"
      }`}
      onClick={() =>
        editor.chain().focus().toggleSubscript().run()
      }
      title="Subíndice"
    >
      <Subscript />
    </button>
  );
};

export default SubscriptButton;
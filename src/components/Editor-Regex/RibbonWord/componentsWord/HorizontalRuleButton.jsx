import React from "react";

const HorizontalRuleButton = ({ editor }) => {
  return (
    <button
      className="
        p-1 rounded w-7 h-6.5
        flex items-center justify-center
        border transition-all
        hover:bg-[#f3f2f1]
      "
      onClick={() =>
        editor.chain().focus().setHorizontalRule().run()
      }
      title="Línea horizontal"
    >
      ―
    </button>
  );
};

export default HorizontalRuleButton;
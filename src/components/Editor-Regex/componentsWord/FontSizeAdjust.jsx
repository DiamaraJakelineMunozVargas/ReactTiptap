import React from "react";

const FontSizeAdjust = ({ editor }) => {
  const handleAdjust = (direction) => {
    // Obtenemos el tamaño actual (por defecto 12 si no hay nada seleccionado)
    const currentAttributes = editor.getAttributes("textStyle");
    const currentSize = currentAttributes.fontSize 
      ? parseInt(currentAttributes.fontSize.replace("px", ""), 10) 
      : 12;

    let newSize = direction === "up" ? currentSize + 1 : currentSize - 1;
    if (newSize < 1) newSize = 1; // Seguridad

    // Ejecuta el comando de tu extensión personalizada de tamaño de fuente
    editor.chain().focus().setFontSize(`${newSize}px`).run();
  };

  return (
    <div className="flex items-center gap-0.5 border border-[#d2d0ce] rounded bg-white px-0.5 h-[22px]">
      <button
        type="button"
        onClick={() => handleAdjust("up")}
        className="hover:bg-[#f3f2f1] text-xs font-bold px-1 h-full rounded-[2px] flex items-center"
        title="Aumentar tamaño de fuente"
      >
        A<span>▲</span>
      </button>
      <button
        type="button"
        onClick={() => handleAdjust("down")}
        className="hover:bg-[#f3f2f1] text-[10px] font-bold px-1 h-full rounded-[2px] flex items-center"
        title="Disminuir tamaño de fuente"
      >
        A<span>▼</span>
      </button>
    </div>
  );
};

export default FontSizeAdjust;
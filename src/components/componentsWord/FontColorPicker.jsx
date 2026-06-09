import { Baseline } from "lucide-react";

const FontColorPicker = ({ editor }) => {
  if (!editor) return null;

  const colors = [
    { hex: "#000000", label: "Negro" },
    { hex: "#ef4444", label: "Rojo" },
    { hex: "#3b82f6", label: "Azul" },
    { hex: "#10b981", label: "Verde" },
    { hex: "#f59e0b", label: "Amarillo" },
    { hex: "#6b7280", label: "Gris" },
  ];

  return (
    <div className="relative group">
      <button 
        className="p-2 border border-gray-300 rounded bg-white hover:bg-gray-100 flex flex-col items-center justify-center gap-0.5"
        title="Color de fuente"
      >
        <Baseline size={16} className="text-gray-700" />
        {/* Simula la barrita de color dinámica debajo del icono */}
        <div className="w-4 h-0.5 bg-red-600 rounded-full" />
      </button>

      {/* Menú de colores flotante */}
      <div className="absolute hidden group-hover:grid grid-cols-3 bg-white border border-gray-300 shadow-xl rounded-md p-2 z-50 gap-1.5 top-full left-0 mt-1 min-w-[100px]">
        {colors.map((c) => (
          <button
            key={c.hex}
            title={c.label}
            className="w-5 h-5 rounded-md border border-gray-400 hover:scale-110 transition-transform"
            style={{ backgroundColor: c.hex }}
            onClick={() => editor.chain().focus().setColor(c.hex).run()}
          />
        ))}
        <button
          className="col-span-3 text-[10px] text-center border-t pt-1 mt-1 hover:text-blue-600"
          onClick={() => editor.chain().focus().unsetColor().run()}
        >
          Automático
        </button>
      </div>
    </div>
  );
};

export default FontColorPicker;
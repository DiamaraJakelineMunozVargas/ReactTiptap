import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

const TextAlignGroup = ({ editor }) => {
  if (!editor) return null;

  const alignments = [
    { value: "left", icon: <AlignLeft size={16} />, title: "Alinear a la izquierda" },
    { value: "center", icon: <AlignCenter size={16} />, title: "Centrar" },
    { value: "right", icon: <AlignRight size={16} />, title: "Alinear a la derecha" },
    { value: "justify", icon: <AlignJustify size={16} />, title: "Justificar" },
  ];

  return (
    <div className="flex bg-gray-50 border border-gray-300 rounded p-0.5">
      {alignments.map((item) => (
        <button
          key={item.value}
          title={item.title}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive({ textAlign: item.value })
              ? "bg-blue-100 text-blue-700 font-bold shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => editor.chain().focus().setTextAlign(item.value).run()}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default TextAlignGroup;
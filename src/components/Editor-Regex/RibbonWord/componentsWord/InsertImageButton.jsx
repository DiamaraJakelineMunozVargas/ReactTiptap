import React from "react";
import { ImagePlus } from "lucide-react";

const InsertImageButton = ({ editor }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      editor
        .chain()
        .focus()
        .setImage({
          src: reader.result,
        })
        .run();
    };

    reader.readAsDataURL(file);
  };

  return (
    <label
      className="
        p-1 rounded w-7 h-6.5
        flex items-center justify-center
        border transition-all
        hover:bg-[#f3f2f1]
        cursor-pointer
      "
      title="Insertar Imagen"
    >
      <ImagePlus size={15} />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </label>
  );
};

export default InsertImageButton;
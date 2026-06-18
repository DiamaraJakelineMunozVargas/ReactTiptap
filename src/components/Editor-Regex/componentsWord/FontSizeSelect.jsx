import React from "react";
import Select from "react-select";

const sizeOptions = [
  { value: "8px", label: "8" },
  { value: "9px", label: "9" },
  { value: "10px", label: "10" },
  { value: "11px", label: "11" },
  { value: "12px", label: "12" },
  { value: "14px", label: "14" },
  { value: "16px", label: "16" },
  { value: "18px", label: "18" },
  { value: "20px", label: "20" },
  { value: "24px", label: "24" },
  { value: "28px", label: "28" },
  { value: "32px", label: "32" },
  { value: "36px", label: "36" },
  { value: "48px", label: "48" },
  { value: "72px", label: "72" },
];
const FontSizeSelect = ({ editor }) => {
  return (
    <Select
    options={sizeOptions}
    defaultValue={sizeOptions[4]}
      className="basic-single"
      onChange={(e) => editor.chain().focus().setFontSize(e.value).run()}
      
    >
     
    </Select>
  );
};

export default FontSizeSelect;

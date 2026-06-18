import Select from "react-select";

const headingOptions = [
  {
    value: "paragraph",
    label: "Texto normal",
    style: { fontSize: "14px", fontWeight: "normal" },
  },
  {
    value: "1",
    label: "Título 1",
    style: { fontSize: "20px", fontWeight: "bold" },
  },
  {
    value: "2",
    label: "Título 2",
    style: { fontSize: "17px", fontWeight: "bold" },
  },
  {
    value: "3",
    label: "Título 3",
    style: { fontSize: "15px", fontWeight: "bold" },
  },
];

const HeadingSelect = ({ editor }) => {
  if (!editor) return null;

  const getCurrentValue = () => {
    if (editor.isActive("heading", { level: 1 })) return headingOptions[1];
    if (editor.isActive("heading", { level: 2 })) return headingOptions[2];
    if (editor.isActive("heading", { level: 3 })) return headingOptions[3];
    return headingOptions[0]; // Por defecto texto normal
  };

  const handleStyleChange = (selectedOption) => {
    if (selectedOption.value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const nivelTitulo = parseInt(selectedOption.value);
      editor
        .chain()
        .focus()
        .unsetFontSize?.()
        .toggleHeading({ level: nivelTitulo })
        .run();
    }
  };

  return (
    <Select
      className="w-44 text-black text-sm"
      options={headingOptions}
     
      value={getCurrentValue()}
      formatOptionLabel={({ label, style }) => <div style={style}>{label}</div>}
      onChange={handleStyleChange}
      isSearchable={false} 
    />
  );
};

export default HeadingSelect;

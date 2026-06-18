import React from "react";
import Select from "react-select"

const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Verdana", label: "Verdana" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Georgia", label: "Georgia" },
];
const FontFamilySelect = ({editor}) => {
  return (
  
        <Select
          className="basic-single"
          options={fontOptions}
          defaultValue={fontOptions[0]}
          formatOptionLabel={({value, label})=>(
            <div style={{fontFamily:value}}>
                {label}
            </div>
          )}
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.value).run()
          }
        >
        
        </Select>
  
  );
};

export default FontFamilySelect;

import { useState, useRef, useEffect } from "react";
import { Baseline, Rainbow } from "lucide-react";

const FontColorPicker = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef();

  const inputColor = useRef();

  const currentColor = editor.getAttributes("textStyle").color ?? "#000000";
  if (!editor) return null;

  const themeColors = [
    [
      "#FFFFFF",
      "#000000",
      "#EEECE1",
      "#1F497D",
      "#4F81BD",
      "#C0504D",
      "#9BBB59",
      "#8064A2",
      "#4BACC6",
      "#F79646",
    ],

    [
      "#F2F2F2",
      "#7F7F7F",
      "#DDD9C3",
      "#C6D9F1",
      "#DBE5F1",
      "#F2DCDB",
      "#EBF1DD",
      "#E5E0EC",
      "#DBEEF3",
      "#FDEADA",
    ],

    [
      "#D8D8D8",
      "#595959",
      "#C4BD97",
      "#8DB4E2",
      "#B8CCE4",
      "#E5B9B7",
      "#D7E3BC",
      "#CCC1DA",
      "#B7DEE8",
      "#FBD5B5",
    ],

    [
      "#BFBFBF",
      "#3F3F3F",
      "#938953",
      "#548DD4",
      "#95B3D7",
      "#D99694",
      "#C3D69B",
      "#B2A2C7",
      "#92CDDC",
      "#FAC08F",
    ],

    [
      "#A5A5A5",
      "#262626",
      "#494429",
      "#17365D",
      "#366092",
      "#953735",
      "#76923C",
      "#5F497A",
      "#31859B",
      "#E36C09",
    ],
  ];
  const standardColors = [
    "#C00000",
    "#FF0000",
    "#FFC000",
    "#FFFF00",
    "#92D050",
    "#00B050",
    "#00B0F0",
    "#0070C0",
    "#002060",
    "#7030A0",
  ];
  const ColorSquare = ({ color, onClick }) => (
    <button
      onClick={onClick}
      className="w-5 h-5 border border-gray-300 hover:scale-110 transition rounded-sm"
      style={{ backgroundColor: color }}
    />
  );
  useEffect(() => {
    const handleClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 border rounded bg-white hover:bg-gray-100 flex flex-col items-center"
      >
        <Baseline size={17} />

        <div
          className="w-4 h-1 rounded"
          style={{ backgroundColor: currentColor }}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border rounded-lg shadow-xl z-50 p-3">
          <button
            className="w-full text-left px-2 py-1 rounded hover:bg-gray-100"
            onClick={() => {
              editor.chain().focus().unsetColor().run();

              setOpen(false);
            }}
          >
            Automático
          </button>
          <p className="text-xs text-gray-500 mt-3 mb-2">Colores del tema</p>

          <div className="space-y-1">
            {themeColors.map((row, index) => (
              <div key={index} className="flex gap-1">
                {row.map((color) => (
                  <ColorSquare
                    key={color}
                    color={color}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();

                      setOpen(false);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 mb-2">Colores estándar</p>

          <div className="flex gap-1 flex-wrap">
            {standardColors.map((color) => (
              <ColorSquare
                key={color}
                color={color}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();

                  setOpen(false);
                }}
              />
            ))}
          </div>
          <button
            className="mt-4 w-full text-left hover:bg-gray-100 rounded p-2 flex items-center gap-2"
            onClick={() => inputColor.current.click()}
          >
          <Rainbow/> Más colores...
          </button>

          <input
            ref={inputColor}
            type="color"
            className="hidden"
            onChange={(e) => {
              editor.chain().focus().setColor(e.target.value).run();
            }}
          />
        </div>
      )}
    </div>
  );
  
};

export default FontColorPicker;

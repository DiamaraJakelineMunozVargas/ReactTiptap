import React, { useState, useEffect, useRef } from "react";
import { Underline, ChevronDown } from "lucide-react";

const underlineOptions = [
  { value: "solid", borderStyle: "solid" },
  { value: "double", borderStyle: "double" },
  { value: "solid-thick", borderStyle: "solid", borderWidth: "3px" },
  { value: "dotted", borderStyle: "dotted" },
  { value: "dashed", borderStyle: "dashed" },
  { value: "dash-dot", borderStyle: "dashed", styleCustom: "dash-dot" },
  { value: "wavy", borderStyle: "wavy" },
];

const UnderlineSelect = ({ editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  if (!editor) return null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectStyle = (styleValue) => {
    editor.chain().focus().setUnderlineStyle(styleValue).run();
    setIsOpen(false);
  };

  const handleMainClick = () => {
    editor.chain().focus().setUnderlineStyle("solid").run();
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div className="flex items-center bg-white border border-gray-300 rounded h-7 hover:bg-gray-100 transition-colors">
        <button
          type="button"
          onClick={handleMainClick}
          className={`px-1.5 h-full flex items-center justify-center rounded-l border-r border-gray-200 ${
            editor.isActive("underline")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700"
          }`}
          title="Subrayado (Ctrl+S)"
        >
          <Underline size={15} />
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-1 h-full flex items-center justify-center rounded-r hover:bg-gray-200 text-gray-500"
        >
          <ChevronDown size={12} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-52 bg-[#f0f0f0] border border-gray-300 rounded shadow-xl z-50 p-1 flex flex-col gap-1">
          {underlineOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectStyle(option.value)}
              className="w-full h-8 flex items-center justify-center px-2 hover:bg-white rounded transition-colors"
            >
              <div className="w-full flex items-center h-4 relative">
                {/* SOLID */}
                {option.value === "solid" && (
                  <div className="w-full border-t-2 border-black" />
                )}

                {/* DOUBLE */}
                {option.value === "double" && (
                  <div className="w-full border-t-[4px] border-double border-black" />
                )}

                {/* THICK */}
                {option.value === "solid-thick" && (
                  <div className="w-full border-t-[6px] border-black" />
                )}

                {/* DOTTED */}
                {option.value === "dotted" && (
                  <div className="w-full border-t-2 border-dotted border-black" />
                )}

                {/* DASHED */}
                {option.value === "dashed" && (
                  <div className="w-full border-t-2 border-dashed border-black" />
                )}

                {/* DASH DOT */}
                {option.value === "dash-dot" && (
                  <div
                    className="w-full h-[3px]"
                    style={{
                      background:
                        "repeating-linear-gradient(to right, black 0 12px, transparent 12px 16px, black 16px 18px, transparent 18px 26px)",
                    }}
                  />
                )}

                {/* WAVY */}
                {option.value === "wavy" && (
                  <svg
                    width="100%"
                    height="8"
                    viewBox="0 0 120 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 4 Q5 0 10 4 T20 4 T30 4 T40 4 T50 4 T60 4 T70 4 T80 4 T90 4 T100 4 T110 4 T120 4"
                      stroke="black"
                      fill="transparent"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnderlineSelect;

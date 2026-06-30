import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const RibbonSplitButton = ({
  icon,
  active,
  disabled,
  title,
  onMainClick,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  return (
    <div
      className="relative inline-flex items-stretch"
      ref={menuRef}
    >
      {/* Acción principal */}
      <button
        className={`word-btn-sm ${
          active ? "active" : ""
        }`}
        disabled={disabled}
        title={title}
        onClick={onMainClick}
      >
        {icon}
      </button>

      {/* Flecha */}
      <button
        className="word-btn-sm border-l"
        onClick={() => setIsOpen(open => !open)}
      >
        <ChevronDown size={12} />
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-xl z-50 p-1">
          {children({
            closeMenu: () => setIsOpen(false),
          })}
        </div>
      )}
    </div>
  );
};

export default RibbonSplitButton;
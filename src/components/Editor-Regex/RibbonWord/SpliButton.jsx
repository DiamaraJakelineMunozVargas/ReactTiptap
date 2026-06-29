import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const SplitButton = ({
  icon,
  active,
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
      className="relative inline-flex"
      ref={menuRef}
    >
      {/* Acción principal */}
      <button
        className={`word-btn-sm ${
          active ? "active" : ""
        }`}
        title={title}
        onClick={onMainClick}
      >
        {icon}
      </button>

      {/* Flecha */}
      <button
        className="word-btn-sm border-l"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronDown size={12} />
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
};

export default SplitButton;
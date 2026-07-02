import React from "react";

const bullets = [
  { type: "disc", label: "●" },
  { type: "circle", label: "○" },
  { type: "square", label: "■" },
];

const BulletListMenu = ({ editor, closeMenu }) => {
  return (
    <div className="flex flex-col p-1">
      {bullets.map((bullet) => (
        <button
          key={bullet.type}
          className="px-3 py-2 hover:bg-gray-100 rounded text-left"
          onClick={() => {
            editor.chain().focus().setBulletStyle(bullet.type).run();
            closeMenu();
          }}
        >
          {bullet.label}
        </button>
      ))}
    </div>
  );
};

export default BulletListMenu;

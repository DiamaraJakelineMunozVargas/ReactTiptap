import React from "react";

const RibbonButton = ({ active, onClick, title, children }) => {
  return (
    <button
      className={`word-btn-sm ${active ? "active" : ""}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

export default RibbonButton;

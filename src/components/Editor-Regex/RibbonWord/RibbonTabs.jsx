import React from "react";

const tabs = [
  { id: "home", label: "Inicio" },
  { id: "insert", label: "Insertar" },
  { id: "design", label: "Diseño" },
  { id: "layout", label: "Disposición" },
  { id: "references", label: "Referencias" },
  { id: "review", label: "Revisar" },
  { id: "view", label: "Vista" },
];

const RibbonTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div style={{ display: "flex", background: "#2b579a", padding: "0 4px" }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "6px 14px",
              fontSize: 12,
              fontFamily: "'Segoe UI', sans-serif",
              fontWeight: 400,
              color: isActive ? "#2b579a" : "rgba(255,255,255,0.9)",
              background: isActive ? "#f3f2f1" : "transparent",
              border: "none",
              borderRadius: isActive ? "2px 2px 0 0" : 0,
              cursor: "pointer",
              marginTop: isActive ? 2 : 0,
              transition: "background 0.1s",
              outline: "none",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default RibbonTabs;
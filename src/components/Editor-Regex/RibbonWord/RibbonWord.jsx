import React, { useState } from "react";
import RibbonTabs from "./RibbonTabs";
import HomeTabs from "./tabs/HomeTabs";
import InsertTabs from "./tabs/InsertTabs";
import { Save, Undo2, Redo2, Printer } from "lucide-react";

const qatBtnStyle = (enabled = true) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  border: "none",
  borderRadius: 2,
  background: "transparent",
  cursor: enabled ? "pointer" : "default",
  color: "#fff",
  opacity: enabled ? 1 : 0.4,
  padding: 0,
  transition: "background 0.1s",
});


const QatBtn = ({ icon, title, onClick, disabled }) => {
  const IconComponent = icon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={qatBtnStyle(!disabled)}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.background = "rgba(255,255,255,0.35)"; }}
      onMouseUp={e => { if (!disabled) e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
    >
      <IconComponent size={15} strokeWidth={2} />
    </button>
  );
};


const RibbonWord = ({ editor, handleSave, handlePrint, variables, docTitle = "Documento sin título" }) => {
  const [activeTab, setActiveTab] = useState("home");

  const canUndo = editor?.can().undo() ?? false;
  const canRedo = editor?.can().redo() ?? false;

  return (
    <div style={{ background: "#2b579a", borderBottom: "1px solid #1e3f75", userSelect: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>

      {/* ── 1. BARRA DE ACCESO RÁPIDO ── */}
      <div style={{ display: "flex", alignItems: "center", padding: "3px 8px 3px 12px", gap: 1, background: "#2b579a" }}>

        <QatBtn icon={Save}  title="Guardar (Ctrl+S)"  onClick={handleSave} />
        <QatBtn icon={Undo2} title="Deshacer (Ctrl+Z)" onClick={() => editor?.chain().focus().undo().run()} disabled={!canUndo} />
        <QatBtn icon={Redo2} title="Rehacer (Ctrl+Y)"  onClick={() => editor?.chain().focus().redo().run()} disabled={!canRedo} />

        {/* separador */}
        <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.3)", margin: "0 4px" }} />

        <QatBtn icon={Printer} title="Imprimir (Ctrl+P)" onClick={handlePrint} />

        {/* título del documento centrado */}
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.9)", paddingRight: 80 }}>
          {docTitle} — Word
        </div>
      </div>

      {/* ── 2. PESTAÑAS ── */}
      <RibbonTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ── 3. CONTENIDO DE PESTAÑA ── */}
      <div style={{ display: "flex", alignItems: "stretch", padding: "2px 4px 0", minHeight: 82, background: "#f3f2f1", borderTop: "1px solid #c8c6c4" }}>
        {activeTab === "home" && (
          <HomeTabs editor={editor} variables={variables} />
        )}
          {activeTab === "insert" && (
          <InsertTabs editor={editor} variables={variables} />
        )}
      </div>

    </div>
  );
};

export default RibbonWord;
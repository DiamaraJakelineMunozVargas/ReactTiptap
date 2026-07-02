import React from "react";
import RibbonGroup from "../RibbonGroup";
import InsertVariableSelect from "../componentsWord/InsertVariableSelect";

import HorizontalRuleButton from "../componentsWord/HorizontalRuleButton";
import InsertImageButton from "../componentsWord/InsertImageButton";
import {Globe, Shapes} from "lucide-react";

const RibbonBtn = ({ icon, label, onClick, iconColor = "#323130" }) => {
  const IconComponent = icon;
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 3,
        width: 52,
        minHeight: 54,
        border: "1px solid transparent",
        borderRadius: 2,
        background: "transparent",
        cursor: "pointer",
        fontSize: 10,
        color: "#323130",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "4px 2px 2px",
        transition: "background .1s, border-color .1s",
        lineHeight: 1.2,
        textAlign: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#e8e6e4";
        e.currentTarget.style.borderColor = "#c8c6c4";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      <IconComponent size={22} strokeWidth={1.5} color={iconColor} />
      <span style={{ whiteSpace: "pre-line" }}>{label}</span>
    </button>
  );
};
const InsertTabs = ({ editor, variables }) => {
  return (
    <>
     
     <RibbonGroup title="Ilustraciones">
        <InsertImageButton editor={editor} label="IMAGENES"/>
        <RibbonBtn icon={Globe}  label="En línea" />
        <RibbonBtn icon={Shapes} label="Formas" />
      </RibbonGroup>
       {/* ── Separadores ── */}
      <RibbonGroup title="Separadores">
        <HorizontalRuleButton editor={editor} />
      </RibbonGroup>

     {/* ── Variables ── */}
      <RibbonGroup title="Variables">
        <InsertVariableSelect editor={editor} variables={variables} />
      </RibbonGroup>
    </>
  );
};

export default InsertTabs;

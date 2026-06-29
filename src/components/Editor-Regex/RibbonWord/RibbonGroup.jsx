import React from "react";

const RibbonGroup = ({ title, children }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      borderRight: "1px solid #c8c6c4",
      padding: "2px 6px 0",
      minWidth: 40,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flex: 1,
        flexWrap: "wrap",
        paddingBottom: 2,
      }}>
        {children}
      </div>
      <span style={{
        fontSize: 10,
        color: "#605e5c",
        textAlign: "center",
        padding: "1px 2px 2px",
        letterSpacing: "0.02em",
        fontFamily: "'Segoe UI', sans-serif",
        whiteSpace: "nowrap",
      }}>
        {title}
      </span>
    </div>
  );
};

export default RibbonGroup;
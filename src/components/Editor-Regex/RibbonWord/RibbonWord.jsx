import React, { useState } from "react";
import RibbonTabs from "./RibbonTabs";
import HomeTabs from "./tabs/HomeTabs";

const RibbonWord = ({ editor, handleSave, handlePrint, variables }) => {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div style={{ background: "#f3f2f1", borderBottom: "1px solid #c8c6c4", userSelect: "none" }}>
      <RibbonTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ display: "flex", alignItems: "stretch", padding: "2px 4px 4px", minHeight: 80, gap: 0 }}>
        {activeTab === "home" && (
          <HomeTabs editor={editor} handleSave={handleSave} handlePrint={handlePrint} variables={variables} />
        )}
      </div>
    </div>
  );
};

export default RibbonWord;
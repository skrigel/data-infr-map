import React from "react";
import CollapsePanelButton from "./CollapsePanelButton";
import "./CollapsePanel.css";

const CollapsePanel = ({ onClick, isOpen }) => {
  return (
    <div>
      <CollapsePanelButton onClick={onClick} isOpen={isOpen}></CollapsePanelButton>
      <div style={{ display: isOpen ? "block" : "none" }} className="Panel-container">
        <div className="Panel-textContainer">
          <p>This is the collapsible panel content.</p>
        </div>
      </div>
    </div>
  );
};

export default CollapsePanel;

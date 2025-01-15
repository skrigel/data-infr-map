import React from "react";

const CollapsePanelButton = ({ onClick, isOpen }) => (
  <button onClick={onClick} className="medium-btn">
    {isOpen ? "Close Panel" : "Open Panel"}
  </button>
);

export default CollapsePanelButton;

import React from "react";
import "./DemoPanel.css";

const DemoPanel = ({ selectedRegion, onClose }) => {
  const handleViewMoreClick = () => {
    console.log("View more info for:", selectedRegion);
    // Add any additional actions here
  };

  return (
    <>
      <button onClick={onClose} className="close-button">
        Close
      </button>
      <h3>{selectedRegion} - Demographic Data</h3>
      {/* Display demographic data */}
      <button onClick={handleViewMoreClick} className="view-more-button">
        View More Info
      </button>
    </>
  );
};

export default DemoPanel;

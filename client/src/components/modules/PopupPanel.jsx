import React from "react";
import "../../utilities.css";
import "./PopupPanel.css";
import { getFontSize } from "@mantine/core";

const PopupPanel = ({ selPoint, setSelPoint, setDemoPanelOpen }) => {
  return (
    <div className="popup-panel">
      <div className="popup-inner">
        <br></br>
        <button className="x-button" onClick={() => setSelPoint(null)}>
          X
        </button>
        <p>
          <strong>Info about {selPoint.name}</strong>
        </p>

        <p>Address: {selPoint.address + ", " + selPoint.locality}</p>

        <p>Company: {selPoint.company}</p>

        <p>Type: {selPoint.type}</p>
        <button onClick={() => setDemoPanelOpen(true)} className="view-more-button">
          View Regional Information
        </button>
      </div>
    </div>
  );
};

export default PopupPanel;

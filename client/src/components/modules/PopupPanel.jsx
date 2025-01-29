import React from "react";
import "../../utilities.css";
import "./PopupPanel.css";
import { getFontSize } from "@mantine/core";
import { Box } from "@mui/material";

const PopupPanel = ({ selPoint, setSelPoint, setDemoPanelOpen }) => {
  return (
    <div className="popup-panel">
      <div className="popup-inner mt-0">
        <br></br>
        <button className="x-button" onClick={() => setSelPoint(null)}>
          X
        </button>
        <p>
          <strong>Info about {selPoint.name}</strong>
        </p>

        <p>Address: {selPoint.address + ", " + selPoint.locality}</p>

        <p>Management: {selPoint.management}</p>
        <p>Connected Networks: {selPoint.net_count}</p>
        <p>Networks in MA: {selPoint.networks.length}</p>
        <p>Type: {selPoint.type}</p>
      </div>
      <Box className="p-2 border-gray-500 bottom-5 absolute">
        <button onClick={() => setDemoPanelOpen(true)} className="view-more-button">
          Explore Networks
        </button>
      </Box>
    </div>
  );
};

export default PopupPanel;

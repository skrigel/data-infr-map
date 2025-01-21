import React from "react";
import "../../utilities.css";
import "./PopupPanel.css";

const PopupPanel = ({ selPoint, setSelPoint }) => {
  return (
    <div>
      <br></br>
      <button onClick={() => setSelPoint(null)}>X</button>
      <p>Info about: {selPoint.name}</p>
      <br></br>
      <p>Address: {selPoint.address + ", " + selPoint.locality}</p>
      <br></br>
      <p>Company: {selPoint.company}</p>
    </div>
  );
};

export default PopupPanel;

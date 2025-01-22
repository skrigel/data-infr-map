import "./PopupButtons.css";

import React, { Component, useRef, useEffect, useState } from "react";

const PopupButtons = (allDemoTypes, demoType, setDemoType) => {
  return (
    <div style={{ maxHeight: "300px", overflow: "scroll" }}>
      {allDemoTypes.map((type) => (
        <button
          key={type}
          onClick={() => setDemoType(type)}
          style={{ backgroundColor: demoType === type ? "#444" : "#555" }}
        >
          {type.replace("_", " ").toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default PopupButtons;

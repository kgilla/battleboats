import React from "react";
import "./TurnIndicator.css";

const TurnIndicator = (props) => {
  return (
    <div className="turn-indicator">
      <h2 className="turn-title">Turn</h2>
      <div
        className={
          props.direction === "right" ? "arrow_box_right" : "arrow_box_left"
        }
      >
        {props.direction === "right" ? ">" : "<"}
      </div>
    </div>
  );
};

export default TurnIndicator;

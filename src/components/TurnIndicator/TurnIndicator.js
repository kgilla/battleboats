import React from "react";
import "./TurnIndicator.css";

const TurnIndicator = (props) => {
  return (
    <div
      className={
        props.direction === "right" ? "arrow_box_right" : "arrow_box_left"
      }
    >
      {props.direction === "right" ? ">" : "<"}
    </div>
  );
};

export default TurnIndicator;

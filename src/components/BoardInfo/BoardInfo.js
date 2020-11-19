import React from "react";

const BoardInfo = (props) => {
  return (
    <div className={props.title === "Your Boats" ? "your-info" : "pc-info"}>
      <h2 className="info-title">{props.title}</h2>
      <h2 className="info-ship-count">Ships Left: {props.shipsLeft}</h2>
    </div>
  );
};

export default BoardInfo;

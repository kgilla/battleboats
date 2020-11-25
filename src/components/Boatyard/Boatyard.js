import React from "react";
import "./Boatyard.css";

const Boatyard = (props) => {
  const handleClick = (e) => {
    props.orientation === 0
      ? props.sendBoatOrientation(1)
      : props.sendBoatOrientation(0);
  };

  const handleDragStart = (e) => {
    props.orientation === 0 ? handleOffsetX(e) : handleOffsetY(e);
  };

  const handleOffsetX = (e) => {
    let size = determineSquareSize();
    let offset = e.nativeEvent.offsetX - size;
    offset = Math.ceil(offset / size);
    props.sendOffset(offset);
  };

  const handleOffsetY = (e) => {
    let size = determineSquareSize();
    let offset = e.nativeEvent.offsetY - size;
    offset = Math.ceil(offset / size);
    props.sendOffset(offset);
  };

  const determineSquareSize = () => {
    return props.windowWidth < 360
      ? 25
      : props.windowWidth < 768
      ? 30
      : props.windowWidth < 1400
      ? 40
      : 50;
  };

  const createBoat = () => {
    let boat = [];
    for (let i = 0; i < props.boats[0].length; i++) {
      boat.push(
        <div key={i} className={props.boats[0].name.toLowerCase()}></div>
      );
    }
    return boat;
  };

  return (
    <div className="boatyard">
      <h1 className="boatyard-title">Place Your Boats</h1>
      <div className="dock" onClick={handleClick}>
        {props.boats.length > 0 ? (
          <div
            className={
              props.orientation === 0 ? "boat-horizontal" : "boat-vertical"
            }
            draggable
            onDragStart={handleDragStart}
            onClick={handleClick}
          >
            {props.boats.length > 0 ? createBoat() : null}
          </div>
        ) : (
          <h2 className="dock-text">All Set!</h2>
        )}
      </div>
      {props.boats.length > 0 ? (
        <h2 className="boat-name">{props.boats[0].name}</h2>
      ) : null}
    </div>
  );
};

export default Boatyard;

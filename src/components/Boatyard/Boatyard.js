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
    let offset = e.nativeEvent.offsetX - 40;
    offset = Math.ceil(offset / 40);
    props.sendOffset(offset);
  };

  const handleOffsetY = (e) => {
    let offset = e.nativeEvent.offsetY - 40;
    offset = Math.ceil(offset / 40);
    props.sendOffset(offset);
  };

  const createBoat = () => {
    let boat = [];
    for (let i = 0; i < props.boats[0].length; i++) {
      boat.push(<div key={i} className="boat"></div>);
    }
    return boat;
  };

  return (
    <div className="boatyard">
      <h1 className="boatyard-title">Place Your Boats</h1>
      <p className="floating-tip" id="tip1">
        Click to rotate!
      </p>
      <div className="dock" onClick={handleClick}>
        <div
          className={
            props.orientation === 0 ? "boat-horizontal" : "boat-vertical"
          }
          draggable
          onDragStart={handleDragStart}
          onClick={handleClick}
        >
          {props.boats.length > 0 ? createBoat() : <h2>All Set!</h2>}
        </div>
      </div>
      {props.boats.length > 0 ? (
        <h2 className="boat-name">{props.boats[0].name}</h2>
      ) : null}
      <p className="floating-tip" id="tip2">
        Drag and drop boats!
      </p>
    </div>
  );
};

export default Boatyard;

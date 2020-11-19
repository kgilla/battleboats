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
    offset = Math.floor(offset / 40) + 1;
    props.sendOffset(offset);
  };

  const handleOffsetY = (e) => {
    let offset = e.nativeEvent.offsetY - 40;
    offset = Math.floor(offset / 40) + 1;
    props.sendOffset(offset);
  };

  const handleGameStart = () => {
    props.startGame();
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
      <h1 className="boatyard-title">Shipyard</h1>
      <div className="dock">
        <div
          className={
            props.orientation === 0 ? "boat-horizontal" : "boat-vertical"
          }
          draggable
          onDragStart={handleDragStart}
          onClick={handleClick}
        >
          {props.boats.length > 0 ? (
            createBoat()
          ) : (
            <button onClick={handleGameStart}>Start Game</button>
          )}
        </div>
      </div>
      <h1>{props.orientation === 0 ? "horizontal" : "vertical"}</h1>
      <button onClick={handleClick}>Rotate</button>
    </div>
  );
};

export default Boatyard;

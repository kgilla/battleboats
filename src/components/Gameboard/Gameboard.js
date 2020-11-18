import React from "react";
import "./Gameboard.css";

const Board = (props) => {
  const info = {
    colInfo: ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rowInfo: ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  };

  const handleClick = (e) => {
    let coords = e.target.attributes[0].value.split(",");
    let newCoords = coords.map((coord) => {
      return parseInt(coord);
    });
    props.handleInput(newCoords);
  };

  const determineClass = (cell) => {
    if (cell !== null) {
      if (cell.isSunk) {
        return "is-sunk";
      } else if (cell === "~") {
        return "board-miss";
      } else if (cell.isHit) {
        return "board-hit";
      } else if (props.handleInput) {
        return "your-square";
      } else {
        return "your-ship";
      }
    } else if (props.handleInput) {
      return "your-square";
    } else {
      return "board-square";
    }
  };

  const determineInner = (cell) => {
    if (cell !== null) {
      if (cell.isSunk || cell.isHit) {
        return "X";
      } else if (cell === "~") {
        return "~";
      }
    }
  };

  return (
    <div className={props.active ? "active" : "inactive"}>
      <div className="gameboard-container">
        <div className="gameboard-col-info">
          {info.rowInfo.map((row, i) => (
            <div className="info-square" key={i}>
              {row}
            </div>
          ))}
        </div>
        <div className="gameboard-row-info">
          {info.colInfo.map((col, i) => (
            <div className="info-square" key={i}>
              {col}
            </div>
          ))}
        </div>
        <div className="gameboard">
          {props.board.map((row, x) => (
            <div className="gameboard-column" key={x}>
              {row.map((cell, y) => (
                <div
                  key={`${x},${y}`}
                  data={[x, y]}
                  className={determineClass(cell)}
                  onClick={props.handleInput ? handleClick : null}
                >
                  {determineInner(cell)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="board-info">
        <h2 className={props.title === "Your Boats" ? "your-info" : "pc-info"}>
          {props.title}
        </h2>
        <h2 className={props.title === "Your Boats" ? "your-info" : "pc-info"}>
          Ships Left: {props.shipsLeft}
        </h2>
      </div>
    </div>
  );
};

export default Board;

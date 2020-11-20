import React from "react";
import "./Gameboard.css";

import BoardInfo from "../BoardInfo";

const Board = (props) => {
  const info = {
    colInfo: ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rowInfo: ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  };

  const handleEdit = (e) => {
    let newCoords = dataToCoords(e);
    props.handleEdit(props.board[newCoords[0]][newCoords[1]]);
  };

  const handleMove = (e) => {
    let newCoords = dataToCoords(e);
    console.log(newCoords);
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let square = dataToCoords(e);
    props.sendCoord(square);
  };

  const dataToCoords = (e) => {
    let square = e.target.attributes[0].value.split(",");
    square = square.map((coord) => {
      return parseInt(coord);
    });
    return square;
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
                  onClick={
                    props.handleInput
                      ? handleMove
                      : props.handleEdit
                      ? handleEdit
                      : null
                  }
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {determineInner(cell)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {props.showInfo ? (
        <BoardInfo shipsLeft={props.shipsLeft} title={props.title} />
      ) : null}
    </div>
  );
};

export default Board;

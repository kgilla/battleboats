import React from "react";
import "./Gameboard.css";

const Board = (props) => {
  const handleClick = (e) => {
    let coords = e.target.attributes[0].value.split(",");
    let newCoords = coords.map((coord) => {
      return parseInt(coord);
    });
    props.handleInput(newCoords);
  };

  const info = {
    colInfo: ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rowInfo: ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  };

  const determineClass = (cell) => {
    let name = "";
    if (cell !== null) {
      // if (cell === Object) {
      if (cell.isSunk) {
        name = "is-sunk";
      } else if (cell === "~") {
        name = "board-miss";
      } else if (cell === "X") {
        name = "board-hit";
      } else {
        name = "board-square";
      }
    } else {
      name = "board-square";
    }
    return name;
  };

  const determineInner = (cell) => {
    return cell === "X" ? cell : cell === "~" ? cell : null;
  };

  console.log(props.board);

  return (
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
  );
};

export default Board;

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

  return (
    <div className="gameboard-container">
      <h2>{props.title}</h2>
      <div className="gameboard">
        {props.board.map((row, x) => (
          <div className="gameboard-column" key={x}>
            {row.map((cell, y) => (
              <div
                key={`${x},${y}`}
                data={[x, y]}
                className={
                  cell === 0
                    ? "board-miss"
                    : cell === 1
                    ? "board-hit"
                    : "board-square"
                }
                onClick={props.handleInput ? handleClick : null}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;

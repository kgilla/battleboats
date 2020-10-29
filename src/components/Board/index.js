import React, { useState } from "react";
import "./Board.css";
import Gameboard from "../../store/gameboard";

const Board = (props) => {
  const [message, setMessage] = useState("");

  const receiveInput = (coords) => {
    let ship = props.board[coords[0]][coords[1]];
    ship ? setMessage(ship.hit()) : setMessage("Seems we missed");
  };
  const handleClick = (e) => {
    let coords = e.target.attributes[0].value.split(",");
    receiveInput(coords);
  };

  return (
    <div className="gameboard-container">
      <div className="gameboard">
        {props.board.map((row, x) => (
          <div className="gameboard-column" key={x}>
            {row.map((cell, y) => (
              <div
                key={`${x},${y}`}
                data={`${x},${y}`}
                className={
                  cell === null
                    ? "board-square"
                    : cell === 1
                    ? "board-hit"
                    : "board-miss"
                }
                onClick={handleClick}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {message ? <h1>{message}</h1> : null}
    </div>
  );
};

export default Board;

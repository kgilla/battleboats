import React, { useState } from "react";
import "./Gameboard.css";
import Gameboard from "../../game_classes/gameboard/gameboard_class";

const Board = () => {
  const [message, setMessage] = useState("");
  const [game, setGame] = useState(new Gameboard(true));

  const handleClick = (e) => {
    let coords = e.target.attributes[0].value.split(",");
    let response = game.receiveAttack(coords);
    setMessage(response.message);
    console.log(response);
  };

  return (
    <div className="gameboard-container">
      <div className="gameboard">
        {game.board.map((row, x) => (
          <div className="gameboard-column" key={x}>
            {row.map((cell, y) => (
              <div
                key={`${x},${y}`}
                data={`${x},${y}`}
                className={
                  cell === 0
                    ? "board-miss"
                    : cell === 1
                    ? "board-hit"
                    : "board-square"
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

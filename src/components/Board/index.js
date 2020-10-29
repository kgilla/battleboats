import React, { useState, useEffect } from "react";
import "./Board.css";
import Gameboard from "../../store/gameboard";

const Board = (props) => {
  let [game, setGame] = useState(props.game);
  let [board, setBoard] = useState(props.board);

  const handleClick = (e) => {
    let coords = e.target.attributes[0].value.split(",");
    let ship = board[coords[0]][coords[1]];
    ship ? console.log(ship) : console.log("miss");
    // if (!gameStarted) {
    //   randomBoats();
    //   setGameStarted(true);
    // } else {
    //   if (message) setMessage("");
    //   let coords = e.target.attributes[0].value.split(",");
    //   let ship = board[coords[0]][coords[1]];
    //   if (ship && ship !== 1) {
    //     ship.hit();
    //     let newBoard = board.slice();
    //     newBoard[coords[0]][coords[1]] = 1;
    //     setBoard(newBoard);
    //   }
    // }
  };

  return (
    <div className="gameboard-container">
      <div className="gameboard">
        {board.map((row, x) => (
          <div className="gameboard-column">
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
    </div>
  );
};

export default Board;

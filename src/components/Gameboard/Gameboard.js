import React, { useState } from "react";
import "./Gameboard.css";
import Gameboard from "../../game_classes/gameboard/gameboard_class";
import Player from "../../game_classes/player/player_class";

const Board = () => {
  const [message, setMessage] = useState("");
  const [game, setGame] = useState(new Gameboard(true));
  const [player, setPlayer] = useState(new Player(game, true));
  const [board, setBoard] = useState(game.board);
  const [ships, setShips] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const attackBoard = () => {
    let move = player.makeMove();
    if (move.isSunk) {
      setShips((prevState) => {
        return prevState - 1;
      });
    }
    setMessage(move.message);
    setBoard(game.board);
  };

  const handleClick = (e) => {
    // let coords = e.target.attributes[0].value.split(",");
    // let response = game.receiveAttack(coords);
    // setMessage(response.message);
    // console.log(response);
    attackBoard();
  };

  return (
    <div className="gameboard-container">
      <div className="gameboard">
        {board.map((row, x) => (
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
      {ships ? <h1>{ships} Boats Left!</h1> : <h1>You Win!</h1>}
    </div>
  );
};

export default Board;

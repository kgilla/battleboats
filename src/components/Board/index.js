import React, { useState, useEffect } from "react";
import "./Board.css";

const Board = () => {
  let [board, setBoard] = useState([]);

  useEffect(() => {
    const buildBoard = () => {
      let game = [];
      for (let x = 0; x < 8; x++) {
        game.push([]);
        for (let y = 0; y < 8; y++) {
          game[x][y] = `${x},${y}`;
        }
      }
      setBoard(game);
    };
    buildBoard();
  }, []);

  return (
    <div>
      {board.map((row, x) => (
        <div className="board-row">
          {row.map((cell, y) => (
            <div data={`${x},${y}`} class="board-square">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;

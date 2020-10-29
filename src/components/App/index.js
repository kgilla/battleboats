import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "../Board";
import Gameboard from "../../store/gameboard";

function App() {
  let [gameStarted, setGameStarted] = useState(false);
  let [game, setGame] = useState("");
  let [board, setBoard] = useState("");

  const generateGame = (random) => {
    if (gameStarted) {
      setGameStarted(false);
    } else {
      let newGame = random ? new Gameboard(true) : new Gameboard();
      setGame(newGame);
      setBoard(newGame.board);
      setGameStarted(true);
    }
  };

  const handleClick = (e) => {
    e.target.value === "Random" ? generateGame(true) : generateGame();
  };

  return (
    <div className="App">
      {gameStarted ? <Board game={game} board={board} /> : null}
      <div className="button-container">
        <button onClick={handleClick} value="New Game">
          New Game
        </button>
        <button onClick={handleClick} value="Random">
          Random
        </button>
      </div>
    </div>
  );
}

export default App;

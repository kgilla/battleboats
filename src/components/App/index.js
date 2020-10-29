import React, { useState } from "react";
import "./App.css";
import Board from "../Board";
import Gameboard from "../../store/gameboard";

function App() {
  let [gameStarted, setGameStarted] = useState(false);
  let [game, setGame] = useState("");
  let [board, setBoard] = useState("");

  const handleClick = () => {
    let newGame = new Gameboard();
    setGame(newGame);
    newGame.randomBoats();
    setBoard(newGame.board);
    setGameStarted(true);
  };
  return (
    <div className="App">
      {gameStarted ? <Board game={game} board={board} /> : null}
      <button onClick={handleClick}>New GAme</button>
    </div>
  );
}

export default App;

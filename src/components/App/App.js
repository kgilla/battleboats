import React, { useState } from "react";
import "./App.css";
import Board from "../Gameboard";

function App() {
  let [gameStarted, setGameStarted] = useState(false);

  const generateGame = () => {
    if (gameStarted) {
      setGameStarted(false);
    } else {
      setGameStarted(true);
    }
  };

  const handleClick = (e) => {
    generateGame();
  };

  const createPlayer = () => {};

  return (
    <div className="App">
      {gameStarted ? (
        <div className="board-container">
          <Board />
        </div>
      ) : null}
      <div className="button-container">
        <button onClick={handleClick} value="New Game">
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;

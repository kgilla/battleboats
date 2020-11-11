import React, { useState } from "react";
import "./App.css";

import Game from "../../game_classes/game/game_class";
import Board from "../Gameboard";

function App() {
  const [game, setGame] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [boardOne, setBoardOne] = useState("");
  const [boardTwo, setBoardTwo] = useState("");

  const handleInput = (input) => {
    let response = game.handleUserTurn(input);
    updateBoards();
    setMessage(response.message);
  };

  const updateBoards = () => {
    setBoardOne(game.playerOne.enemyGameBoard.board);
    setBoardTwo(game.playerTwo.enemyGameBoard.board);
  };

  const startGame = () => {
    let newGame = new Game();
    setGame(newGame);
    setBoardOne(newGame.playerOne.enemyGameBoard.board);
    setBoardTwo(newGame.playerTwo.enemyGameBoard.board);
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <div className="board-container">
          <Board
            board={boardOne}
            title="Your target"
            handleInput={handleInput}
          />
          <Board board={boardTwo} title="Computer's Target" />
        </div>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}

      {message ? <h1>{message}</h1> : null}
    </div>
  );
}

export default App;

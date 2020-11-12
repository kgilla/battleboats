import React, { useState } from "react";
import "./App.css";

import Game from "../../game_classes/game/game_class";
import Board from "../Gameboard";

function App() {
  const [game, setGame] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [boardOne, setBoardOne] = useState("");
  const [boardOneData, setBoardOneData] = useState("");
  const [boardTwo, setBoardTwo] = useState("");
  const [boardTwoData, setBoardTwoData] = useState("");

  const handleInput = (input) => {
    let response = game.handleTurn(input);
    if (response) {
      updateBoards();
      setMessage(response.user.message);
    }
  };

  const updateBoards = () => {
    setBoardOne(game.playerOne.enemyGameBoard.board);
    setBoardTwo(game.playerTwo.enemyGameBoard.board);
    setBoardOneData(game.playerOne.enemyGameBoard);
    setBoardTwoData(game.playerTwo.enemyGameBoard);
  };

  const startGame = () => {
    let newGame = new Game();
    setGame(newGame);
    setBoardOne(newGame.playerOne.enemyGameBoard.board);
    setBoardTwo(newGame.playerTwo.enemyGameBoard.board);
    setBoardOneData(newGame.playerOne.enemyGameBoard);
    setBoardTwoData(newGame.playerTwo.enemyGameBoard);
    setGameStarted(true);
  };

  const newGame = () => {
    startGame();
  };

  return (
    <div className="App">
      {gameStarted ? (
        <div className="board-container">
          <Board
            board={boardTwo}
            title="Computer's Target"
            shipsLeft={boardTwoData.shipsLeft}
          />

          <Board
            board={boardOne}
            title="Your target"
            handleInput={handleInput}
            shipsLeft={boardOneData.shipsLeft}
          />
        </div>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}

      {message ? <h1>{message}</h1> : null}
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./reset.css";
import "./App.css";

import Game from "../../game_classes/game/game_class";
import Board from "../Gameboard";
import Navbar from "../Navbar";

function App() {
  const [game, setGame] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [boardOne, setBoardOne] = useState("");
  const [boardOneData, setBoardOneData] = useState("");
  const [boardTwo, setBoardTwo] = useState("");
  const [boardTwoData, setBoardTwoData] = useState("");

  const handleInput = (input) => {
    let response = game.handleTurn(input);
    if (response) {
      updateBoards();
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
      <Navbar newGame={startGame} />
      {gameStarted ? (
        <div className="board-container">
          <Board
            board={boardTwo}
            title="Your Boats"
            shipsLeft={boardTwoData.shipsLeft}
          />

          <Board
            board={boardOne}
            title="Enemy Boats"
            handleInput={handleInput}
            shipsLeft={boardOneData.shipsLeft}
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;

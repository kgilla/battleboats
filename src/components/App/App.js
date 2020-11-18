import React, { useState } from "react";
import "./reset.css";
import "./App.css";

import Game from "../../game_classes/game/game_class";
import Board from "../Gameboard";
import Navbar from "../Navbar";
import WinScreen from "../WinScreen";

function App() {
  const [game, setGame] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [boardOne, setBoardOne] = useState("");
  const [boardOneData, setBoardOneData] = useState("");
  const [boardTwo, setBoardTwo] = useState("");
  const [boardTwoData, setBoardTwoData] = useState("");
  const [userTurn, setUserTurn] = useState(true);

  // handle input
  // update board
  // check win
  // if not win and is hit, go again - else switch player

  const handleInput = (input) => {
    if (userTurn) {
      let user = game.userTurn(input);
      if (user) {
        updateBoard(1);
        if (user.win) {
          handleWin("player 1 wins");
        } else if (!user.isHit) {
          setUserTurn(false);
          setTimeout(() => {
            takeCompTurn();
          }, 1000);
        }
      }
    }
  };

  const takeCompTurn = () => {
    let comp = game.compTurn();
    updateBoard(2);
    if (comp.win) {
      handleWin("player 2 wins");
    } else if (comp.isHit) {
      setTimeout(() => {
        takeCompTurn();
      }, 1000);
    } else {
      setUserTurn(true);
    }
  };

  const updateBoard = (player) => {
    if (player === 1) {
      setBoardOne(game.playerOne.enemyGameBoard.board);
      setBoardOneData(game.playerOne.enemyGameBoard);
    } else {
      setBoardTwo(game.playerTwo.enemyGameBoard.board);
      setBoardTwoData(game.playerTwo.enemyGameBoard);
    }
  };

  const handleWin = (message) => {
    setMessage(message);
    setIsWin(true);
    // setGameStarted(false)
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
      {isWin ? <WinScreen message={message} /> : null}
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

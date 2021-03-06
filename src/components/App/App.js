import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";

import { Github } from "@styled-icons/simple-icons";
import Game from "../../game_classes/game/game_class";
import Board from "../Gameboard";
import Navbar from "../Navbar";
import Setup from "../Setup";
import GameOver from "../GameOver";
import Rules from "../Rules";
import TurnChange from "../TurnChange";

function App() {
  const [game, setGame] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [winData, setWinData] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [boardOne, setBoardOne] = useState("");
  const [boardOneData, setBoardOneData] = useState("");
  const [boardTwo, setBoardTwo] = useState("");
  const [boardTwoData, setBoardTwoData] = useState("");
  const [userTurn, setUserTurn] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showTurn, setShowTurn] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
  }, []);

  const playerWin = {
    win: true,
    title: "Winner!",
    message: "You defeated the evil Battleboat threat!",
  };

  const compWin = {
    win: false,
    title: "Defeat!",
    message: "You failed to overcome the impending Battleboat threat!",
  };

  const handleInput = (input) => {
    if (userTurn) {
      let user = game.userTurn(input);
      if (user) {
        updateBoard(1);
        if (user.win) {
          handleGameOver(playerWin);
        } else if (!user.isHit) {
          setUserTurn(false);
          changeTurn();
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
      handleGameOver(compWin);
    } else if (comp.isHit) {
      setTimeout(() => {
        takeCompTurn();
      }, 1000);
    } else {
      setTimeout(() => {
        changeTurn();
        setUserTurn(true);
      }, 1000);
    }
  };

  const changeTurn = () => {
    setShowTurn(true);
    setTimeout(() => {
      setShowTurn(false);
    }, 1000);
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

  const handleGameOver = (data) => {
    setWinData(data);
    setIsGameOver(true);
  };

  const startGame = (board) => {
    let newGame = new Game(board);
    setGame(newGame);
    setBoardOne(newGame.playerOne.enemyGameBoard.board);
    setBoardTwo(newGame.playerTwo.enemyGameBoard.board);
    setBoardOneData(newGame.playerOne.enemyGameBoard);
    setBoardTwoData(newGame.playerTwo.enemyGameBoard);
    setUserTurn(true);
    setGameStarted(true);
    setIsGameOver(false);
    changeTurn();
  };

  const handleUserBoard = (board) => {
    startGame(board);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setIsGameOver(false);
  };

  const toggleRules = () => {
    showRules ? setShowRules(false) : setShowRules(true);
  };

  const toggleShowIntro = () => {
    showIntro ? setShowIntro(false) : setShowIntro(true);
  };

  return (
    <div className="App">
      <Navbar
        newGame={handleNewGame}
        toggleRules={toggleRules}
        windowWidth={windowWidth}
        icon={Github}
      />
      {showTurn ? <TurnChange userTurn={userTurn} /> : null}
      {showRules ? <Rules toggleRules={toggleRules} /> : null}
      {isGameOver ? (
        <GameOver data={winData} handleNewGame={handleNewGame} icon={Github} />
      ) : null}
      {gameStarted ? (
        <div className="board-container">
          <Board
            board={boardTwo}
            title="Your Boats"
            shipsLeft={boardTwoData.shipsLeft}
            active={!userTurn ? true : false}
            showInfo={true}
          />
          <Board
            board={boardOne}
            title="Enemy Boats"
            handleInput={handleInput}
            shipsLeft={boardOneData.shipsLeft}
            active={userTurn ? true : false}
            showInfo={true}
          />
        </div>
      ) : (
        <Setup
          windowWidth={windowWidth}
          showIntro={showIntro}
          sendUserBoard={handleUserBoard}
          toggleShowIntro={toggleShowIntro}
        />
      )}
    </div>
  );
}

export default App;

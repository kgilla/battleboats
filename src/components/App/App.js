import React, { useState } from "react";
import "./App.css";

import Game from "../../game_classes/game/game_class";
import Board from "../Gameboard";

function App() {
  const [game, setGame] = useState(new Game());
  const [message, setMessage] = useState("");
  const [boardOne, setBoardOne] = useState(game.playerOne.enemyGameBoard.board);
  const [boardTwo, setBoardTwo] = useState(game.playerTwo.enemyGameBoard.board);

  const handleInput = (input) => {
    let response = game.handleUserTurn(input);
    updateBoards();
    setMessage(response.message);
  };

  const updateBoards = () => {
    setBoardOne(game.playerOne.enemyGameBoard.board);
    setBoardTwo(game.playerTwo.enemyGameBoard.board);
  };

  return (
    <div className="App">
      <div className="board-container">
        <Board board={boardOne} title="Your target" handleInput={handleInput} />
        <Board board={boardTwo} title="Computer's Target" />
      </div>
      {message ? <h1>{message}</h1> : null}
    </div>
  );
}

export default App;

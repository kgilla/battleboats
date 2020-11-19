import React, { useState, useEffect } from "react";
import "./Intro.css";
import Board from "../Gameboard";
import Boatyard from "../Boatyard";

import Gameboard from "../../game_classes/gameboard/gameboard_class";
import Boat from "../../game_classes/boat/boat_class";

const Intro = (props) => {
  const [gameboard, setGameboard] = useState("");
  const [board, setBoard] = useState("");
  const [boats, setBoats] = useState("");
  const [orientation, setOrientation] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const determineOrientation = (orientation) => {
    setOrientation(orientation);
  };

  const calcOffset = (coord) => {
    return orientation === 0
      ? [coord[0] - offset, coord[1]]
      : [coord[0], coord[1] - offset];
  };

  const handleCoord = (coord) => {
    let newCoord = calcOffset(coord);
    let newData = gameboard.attemptPlacingBoat(
      boats[0].length,
      newCoord,
      orientation
    );
    if (newData) {
      gameboard.updateBoard(newData, boats[0]);
      let newBoats = boats.slice(1);
      setBoats(newBoats);
      updateBoard();
    }
  };

  const handleOffset = (num) => {
    setOffset(num);
  };

  const updateBoard = () => {
    setBoard(gameboard.board);
  };

  const handleGameStart = () => {
    props.sendUserBoard(board);
  };

  const handleRandom = () => {
    gameboard.board = gameboard.create();
    gameboard.generateRandomBoats();
    updateBoard();
    setBoats("");
  };

  const handleReset = () => {
    init();
  };

  const init = () => {
    let newBoard = new Gameboard();
    setGameboard(newBoard);
    setBoard(newBoard.board);
    let newBoats = [];
    newBoard.boats.forEach((boat) => {
      for (let i = 0; i < boat.quantity; i++) {
        newBoats.push(new Boat(boat.name, boat.size));
      }
    });
    setBoats(newBoats);
  };

  return (
    <div>
      {gameboard ? (
        <div className="intro-container">
          <Boatyard
            boats={boats}
            orientation={orientation}
            sendBoatOrientation={determineOrientation}
            sendOffset={handleOffset}
            startGame={handleGameStart}
          />
          <Board board={board} sendCoord={handleCoord} />
          <button onClick={handleRandom}>Random</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
};

export default Intro;

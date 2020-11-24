import React, { useState, useEffect } from "react";
import "./Setup.css";

import Board from "../Gameboard";
import Boatyard from "../Boatyard";
import SetupIntro from "../SetupIntro";

import Gameboard from "../../game_classes/gameboard/gameboard_class";
import Boat from "../../game_classes/boat/boat_class";

const Setup = (props) => {
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
    setBoats("");
    updateBoard();
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

  const handleCoordChange = (square) => {
    if (square) {
      setBoats([square.boat, ...boats]);
      gameboard.board = gameboard.board.map((col) => {
        return col.map((ele) => {
          if (ele) {
            if (ele.boat === square.boat) {
              return null;
            } else {
              return ele;
            }
          }
          return null;
        });
      });
      updateBoard();
    }
  };

  const handleIntroChange = () => {
    props.toggleShowIntro();
  };

  return (
    <div className="setup-container">
      {props.showIntro ? <SetupIntro introChange={handleIntroChange} /> : null}
      {gameboard ? (
        <div className="setup-main-container">
          <Boatyard
            boats={boats}
            orientation={orientation}
            sendBoatOrientation={determineOrientation}
            sendOffset={handleOffset}
            windowWidth={props.windowWidth}
          />
          <div className="setup-gameboard">
            <Board
              board={board}
              sendCoord={handleCoord}
              handleEdit={handleCoordChange}
            />
          </div>
        </div>
      ) : null}
      <div className="setup-button-box">
        <button className="setup-button" onClick={handleRandom}>
          Random Boats
        </button>
        <button className="setup-button" onClick={handleReset}>
          Reset Board
        </button>
        <button className="setup-button" onClick={handleIntroChange}>
          How To
        </button>
        {boats.length > 0 ? (
          <button disabled className="start-button">
            Start Game
          </button>
        ) : (
          <button onClick={handleGameStart} className="start-button">
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Setup;

import React, { useState, useEffect } from "react";
import Board from "../Gameboard";
import Boatyard from "../Boatyard";
import Gameboard from "../../game_classes/gameboard/gameboard_class";

const Intro = () => {
  const [gameboard, setGameboard] = useState("");
  const [board, setBoard] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    let newBoard = new Gameboard();
    setGameboard(newBoard);
    setBoard(newBoard.board);
  }, []);

  const handleClick = (e) => {
    e.target.attributes[1].value === "0"
      ? e.target.setAttribute("orientation", "1")
      : e.target.setAttribute("orientation", "0");
  };

  const handleDataChange = (e) => {
    setData({
      size: parseInt(e.target.attributes[0].value),
      orientation: parseInt(e.target.attributes[1].value),
    });
  };

  const handleCoord = (coord) => {
    let newData = gameboard.attemptPlacingBoat(
      data.size,
      coord,
      data.orientation
    );
    if (newData) {
      gameboard.updateBoard(newData, "Hello!");
      updateBoard();
    }
  };

  const updateBoard = () => {
    setBoard(gameboard.board);
  };

  return (
    <div>
      {gameboard ? <Boatyard gameboard={gameboard} /> : null}
      {board ? (
        <Board board={board} data={data} sendCoord={handleCoord} />
      ) : null}
    </div>
  );
};

export default Intro;

import React, { useState, useEffect } from "react";
import { checkData } from "ssri";
import "./Board.css";

const Board = () => {
  let [board, setBoard] = useState([]);
  let [gameStarted, setGameStarted] = useState(false);
  let [shipYard, setShipYard] = useState([]);

  useEffect(() => {
    const buildBoard = () => {
      let game = [];
      for (let x = 0; x < 10; x++) {
        game.push([]);
        for (let y = 0; y < 10; y++) {
          game[x][y] = null;
        }
      }
      setBoard(game);
    };
    buildBoard();
  }, []);

  function Ship(length) {
    this.hitsLeft = length;
    this.isSunk = false;
    this.length = length;
    this.hit = () => {
      this.hitsLeft--;
      console.log(this.hitsLeft);
      if (this.hitsLeft === 0) {
        this.isSunk = true;
        console.log(this.isSunk);
      }
    };
  }

  const randomBoats = () => {
    let shipyard = [];
    const boats = [
      { name: "carrier", quantity: 1, size: 5 },
      { name: "battleboat", quantity: 2, size: 4 },
      { name: "destroyer", quantity: 3, size: 3 },
      { name: "submarine", quantity: 4, size: 2 },
    ];
    boats.forEach((boat) => {
      for (let i = 0; i < boat.quantity; i++) {
        let ship = new Ship(boat.size);
        shipyard.push(ship);
        findSpaces(boat.size, ship);
      }
    });
    setShipYard(shipyard);
  };

  const findSpaces = (size, boat) => {
    let orientation = Math.floor(Math.random() * 2);
    let space = randomSpace(size, orientation);
    let data = makeTestArray(size, space, orientation);
    let results = checkData(data);
    results ? findSpaces(size, boat) : changeData(data, boat);
  };

  const randomSpace = (size, orientation) => {
    let coords = getCoords(size, orientation);
    let space = board[coords[0]][coords[1]];
    return space === null ? coords : randomSpace(size, orientation);
  };

  const getCoords = (size, orientation) => {
    return orientation === 1
      ? [Math.floor(Math.random() * 10), Math.floor(Math.random() * (size + 1))]
      : [
          Math.floor(Math.random() * (size + 1)),
          Math.floor(Math.random() * 10),
        ];
  };

  const makeTestArray = (size, space, orientation) => {
    let data = [];
    if (orientation === 1) {
      for (let x = space[1]; x < space[1] + size; x++) {
        data.push([space[0], x]);
      }
    } else {
      for (let x = space[0]; x < space[0] + size; x++) {
        data.push([x, space[1]]);
      }
    }
    return data;
  };

  const checkData = (data) => {
    let test = [];
    data.forEach((coord) => {
      test.push(board[coord[0]][coord[1]]);
    });
    return test.includes(1);
  };

  const changeData = (data, boat) => {
    let newBoard = board.slice();
    data.forEach((coord) => {
      newBoard[coord[0]][coord[1]] = boat;
    });
    setBoard(newBoard);
  };

  const handleClick = (e) => {
    let coords = e.target.attributes[0].value.split(",");
    let ship = board[coords[0]][coords[1]];
    // let boat = shipYard.find((ship) => ship ===;
    console.log();
    if (ship && ship !== 1) {
      console.log(ship);
      ship.hit();
      let newBoard = board.slice();
      newBoard[coords[0]][coords[1]] = 1;
      setBoard(newBoard);
    } else {
      console.log("miss");
    }
    // let newBoard = [...board];
    // newBoard[parseInt(coords[0])][parseInt(coords[1])] = 1;
    // setBoard(newBoard);
    if (!gameStarted) {
      randomBoats();
      setGameStarted(true);
    }
  };

  return (
    <div className="gameboard">
      {board.map((row, x) =>
        row.map((cell, y) => (
          <div
            key={`${x},${y}`}
            data={`${x},${y}`}
            className={
              cell === null
                ? "board-square"
                : cell === 1
                ? "board-hit"
                : "board-miss"
            }
            onClick={handleClick}
          ></div>
        ))
      )}
    </div>
  );
};

export default Board;

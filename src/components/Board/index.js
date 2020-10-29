import React, { useState, useEffect } from "react";
import "./Board.css";

const Board = () => {
  let [board, setBoard] = useState([]);

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
      if (this.hitsLeft === 0) {
        this.isSunk = true;
      }
    };
  }

  const randomBoats = () => {
    let shipyard = [];
    const boats = [
      { name: "carrier", quantity: 1, size: 5 },
      { name: "battleboat", quantity: 1, size: 4 },
      { name: "destroyer", quantity: 1, size: 3 },
      { name: "submarine", quantity: 1, size: 2 },
    ];
    boats.forEach((boat, b) => {
      for (let i = 0; i < boat.quantity; i++) {
        shipyard.push(new Ship(boat.length));
        findSpaces(boat.size);
      }
    });
  };

  const findSpaces = (size) => {
    let orientation = Math.floor(Math.random() * 2);
    let space = randomSpace(size, orientation);
    checkSpaces(size, space, orientation);
  };

  const randomSpace = (size, orientation) => {
    let coords = getCoords(size, orientation);
    let space = board[coords[0]][coords[1]];
    return space === null ? coords : randomSpace();
  };

  const getCoords = (size, orientation) => {
    return orientation === 1
      ? [Math.floor(Math.random() * 10), Math.floor(Math.random() * (size + 1))]
      : [
          Math.floor(Math.random() * (size + 1)),
          Math.floor(Math.random() * 10),
        ];
  };

  const checkSpaces = (size, space, orientation) => {
    console.log({ size, space, orientation });
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
    console.log(data);
    // horizontal.length === size ? console.log("yes!") : findSpaces(size);
    // let result = horizontal.includes(1);
    // if (result === true) {
    //   findSpaces(size);
    // } else {
    //   let changes = [];
    //   for (let i = space[1]; i < size + space[1]; i++) {
    //     changes.push((space[0], i));
    //   }
    //   colorCoords(changes);
    // }
  };

  // const createTestArray = () => {
  //   let horizontal = board[space[0]].slice(space[1], size + 1);
  //   let vertical = [];
  //   for (let x = space[0]; x < space[0] + size; x++) {
  //     vertical.push(x, space[1]);
  //   }
  // };

  const colorCoords = (changes) => {
    console.log(changes);
  };

  const handleClick = (e) => {
    // let coords = e.target.attributes[0].value.split(",");
    // let newBoard = [...board];
    // newBoard[parseInt(coords[0])][parseInt(coords[1])] = 1;
    // setBoard(newBoard);
    randomBoats();
  };

  // choosedirection
  // get random coor

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

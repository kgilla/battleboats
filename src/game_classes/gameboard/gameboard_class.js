import Boat from "../boat/boat_class";

class Gameboard {
  constructor(board) {
    this.board = board ? board : this.create();
    this.receiveAttack = (coords) => this.checkSpace(coords);
    this.shipsLeft = 10;
    this.random = false;
  }

  checkSpace = (coords) => {
    let newBoard = this.board.slice();
    let data = newBoard[coords[0]][coords[1]];
    this.board = newBoard;
    if (data === null) {
      // blank space, record miss and send data
      newBoard[coords[0]][coords[1]] = "~";
      return { isHit: false, isSunk: false, message: "you missed", newBoard };
    } else {
      // use hit method for boat, record hit on board, send data
      return this.attackBoat(data, newBoard, coords);
    }
  };

  attackBoat = (data, newBoard) => {
    let response = data.boat.hit();
    data.isHit = true;
    if (response.isSunk === true) {
      newBoard = this.sinkShip(data, newBoard);
    }
    this.board = newBoard;
    return {
      isHit: true,
      isSunk: response.isSunk,
      response,
      newBoard,
      boat: data.boat,
    };
  };

  sinkShip = (data, newBoard) => {
    this.shipsLeft -= 1;
    newBoard.map((col) => {
      return col.map((square) => {
        if (square !== null) {
          if (square.boat === data.boat) {
            return (square.isSunk = true);
          }
        }
      });
    });
    return newBoard;
  };

  // Array of boats to use per gameboard
  boats = [
    { name: "Carrier", quantity: 1, size: 5 },
    { name: "Battleboat", quantity: 2, size: 4 },
    { name: "Destroyer", quantity: 3, size: 3 },
    { name: "Submarine", quantity: 4, size: 2 },
  ];

  // Creates a blank gameboard
  create = () => {
    let game = [];
    for (let x = 0; x < 10; x++) {
      game.push([]);
      for (let y = 0; y < 10; y++) {
        game[x][y] = null;
      }
    }
    return game;
  };

  // Functions for randomly populating board

  // Loop for filling gameboard with boats in random spaces
  generateRandomBoats = () => {
    this.random = true;
    this.boats.forEach((boat) => {
      for (let i = 0; i < boat.quantity; i++) {
        let newBoat = new Boat(boat.name, boat.size);
        this.findSpaces(boat.size, newBoat);
      }
    });
  };

  // Loop for each boat to determine orientation, random empty spot based on orientation, and see if it fits in said spot
  findSpaces = (size, boat) => {
    let orientation = Math.floor(Math.random() * 2);
    let space = this.generateRandomSpace(size, orientation);
    let data = this.attemptPlacingBoat(size, space, orientation);
    data ? this.updateBoard(data, boat) : this.findSpaces(size, boat);
  };

  // Generates coordinates based on orientation, size constraints, checks if empty
  generateRandomSpace = (size, orientation) => {
    let coords = this.getCoords(size, orientation);
    let space = this.board[coords[0]][coords[1]];
    return space === null
      ? coords
      : this.generateRandomSpace(size, orientation);
  };

  // Generates random coordinates based on size and orientation constraints
  getCoords = (size, orientation) => {
    return orientation === 1
      ? [this.getRandomInt(0, 9), this.getRandomInt(0, size)]
      : [this.getRandomInt(0, size), this.getRandomInt(0, 9)];
  };

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Placement functions

  // Loop for attemping placement
  attemptPlacingBoat = (size, space, orientation) => {
    let boatData = this.makeBoatData(size, space, orientation);
    let check = this.random
      ? this.makeRandomBoatData(size, space, orientation)
      : boatData;
    if (!this.anyCoordsOutside(boatData)) {
      let spotFilled = this.checkCoordArray(check);
      return spotFilled ? false : boatData;
    } else {
      return false;
    }
  };

  // Generates tests array of coordinates for where the boat will be placed
  makeBoatData = (size, space, orientation) => {
    let data = [];
    if (orientation === 1) {
      for (let y = space[1]; y < space[1] + size; y++) {
        data.push([space[0], y]);
      }
    } else {
      for (let x = space[0]; x < space[0] + size; x++) {
        data.push([x, space[1]]);
      }
    }
    return data;
  };

  makeRandomBoatData = (size, space, orientation) => {
    let data = [];
    if (orientation === 1) {
      for (let y = space[1] - 1; y < space[1] + (size + 1); y++) {
        if (this.coordExists([space[0], y])) data.push([space[0], y]);
      }
    } else {
      for (let x = space[0] - 1; x < space[0] + (size + 1); x++) {
        if (this.coordExists([x, space[1]])) data.push([x, space[1]]);
      }
    }
    return data;
  };

  anyCoordsOutside = (coords) => {
    return coords.some((coord) => !this.coordExists(coord));
  };

  coordExists = (coord) => {
    if (coord[0] < 10 && coord[0] >= 0) {
      if (coord[1] < 10 && coord[1] >= 0) {
        return true;
      }
    }
    return false;
  };

  // Populates test array with values, ,checks values for a boat
  checkCoordArray = (testCoords) => {
    let test = [];
    testCoords.forEach((c) => {
      test.push(this.board[c[0]][c[1]]);
    });
    return test.some((element) => element !== null);
  };

  // Updates the gameboard with the boat object in each space it covers
  updateBoard = (data, boat) => {
    let newBoard = this.board.slice();
    data.forEach((coord) => {
      let boardData = {
        isHit: false,
        isSunk: false,
        boat,
      };
      newBoard[coord[0]][coord[1]] = boardData;
    });
    this.board = newBoard;
  };
}

export default Gameboard;

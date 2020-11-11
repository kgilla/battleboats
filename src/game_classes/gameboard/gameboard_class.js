import Ship from "../ship/ship_class";

class Gameboard {
  constructor(random) {
    this.board = this.create();
    this.placeBoat = () => {};
    this.receiveAttack = (coords) => this.checkSpace(coords);
  }

  checkSpace = (coords) => {
    let newBoard = this.board.slice();
    let data = newBoard[coords[0]][coords[1]];
    this.board = newBoard;
    if (data === null) {
      // blank space, record miss and send data
      newBoard[coords[0]][coords[1]] = 0;
      return { isHit: false, isSunk: false, message: "you missed", newBoard };
    } else if (data === 0) {
      // Previously shot
      return { message: "You already shot here, check your eyes captain!" };
    } else {
      // use hit method for boat, record hit on board, send data
      return this.attackBoat(data, newBoard, coords);
    }
  };

  attackBoat = (data, newBoard, coords) => {
    let response = data.hit();
    newBoard[coords[0]][coords[1]] = 1;
    this.board = newBoard;
    return {
      isHit: true,
      isSunk: response.isSunk,
      message: response.isSunk
        ? `You sunk a ${response.name}`
        : "You hit something",
      response,
      newBoard,
    };
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
    this.boats.forEach((boat) => {
      for (let i = 0; i < boat.quantity; i++) {
        let ship = new Ship(boat.name, boat.size);
        this.findSpaces(boat.size, ship);
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
      ? [Math.floor(Math.random() * 10), Math.floor(Math.random() * (size + 1))]
      : [
          Math.floor(Math.random() * (size + 1)),
          Math.floor(Math.random() * 10),
        ];
  };

  // Placement functions

  // Loop for attemping placement
  attemptPlacingBoat = (size, space, orientation) => {
    let data = this.makeTestCoordArray(size, space, orientation);
    let spotFilled = this.checkCoordArray(data);
    return spotFilled ? false : data;
  };

  // Generates tests array of coordinates for where the boat will be placed
  makeTestCoordArray = (size, space, orientation) => {
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
      newBoard[coord[0]][coord[1]] = boat;
    });
    this.board = newBoard;
  };
}

export default Gameboard;

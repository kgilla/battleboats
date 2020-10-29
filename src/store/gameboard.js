import Ship from "./ship";

class Gameboard {
  constructor(random) {
    this.board = this.create();
    this.generateRandom = random ? this.generateRandomBoats() : null;
    this.placeBoat = () => {};
    this.checkMove = () => {};
    this.clearBoard = () => {
      this.board = this.create();
    };
  }

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

  generateRandomBoats = () => {
    const boats = [
      { name: "Carrier", quantity: 1, size: 5 },
      { name: "Battleboat", quantity: 2, size: 4 },
      { name: "Destroyer", quantity: 3, size: 3 },
      { name: "Submarine", quantity: 4, size: 2 },
    ];
    boats.forEach((boat) => {
      for (let i = 0; i < boat.quantity; i++) {
        let ship = new Ship(boat.name, boat.size);
        this.findSpaces(boat.size, ship);
      }
    });
  };

  findSpaces = (size, boat) => {
    let orientation = Math.floor(Math.random() * 2);
    let space = this.randomSpace(size, orientation);
    let data = this.makeTestArray(size, space, orientation);
    let results = this.checkData(data);
    results ? this.findSpaces(size, boat) : this.changeData(data, boat);
  };

  randomSpace = (size, orientation) => {
    let coords = this.getCoords(size, orientation);
    let space = this.board[coords[0]][coords[1]];
    return space === null ? coords : this.randomSpace(size, orientation);
  };

  getCoords = (size, orientation) => {
    return orientation === 1
      ? [Math.floor(Math.random() * 10), Math.floor(Math.random() * (size + 1))]
      : [
          Math.floor(Math.random() * (size + 1)),
          Math.floor(Math.random() * 10),
        ];
  };

  makeTestArray = (size, space, orientation) => {
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

  checkData = (data) => {
    let test = [];
    data.forEach((coord) => {
      test.push(this.board[coord[0]][coord[1]]);
    });
    return test.some((e) => e !== null);
  };

  changeData = (data, boat) => {
    let newBoard = this.board.slice();
    data.forEach((coord) => {
      newBoard[coord[0]][coord[1]] = boat;
    });
    this.board = newBoard;
  };
}

export default Gameboard;

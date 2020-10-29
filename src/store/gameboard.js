import Ship from "./ship";

class Gameboard {
  constructor() {
    this.create = () => {
      let game = [];
      for (let x = 0; x < 10; x++) {
        game.push([]);
        for (let y = 0; y < 10; y++) {
          game[x][y] = null;
        }
      }
      return game;
    };
    this.board = this.create();
    this.placeBoat = () => {};
    this.randomBoats = () => {
      const boats = [
        { name: "Carrier", quantity: 1, size: 5 },
        { name: "Battleboat", quantity: 2, size: 4 },
        { name: "Destroyer", quantity: 3, size: 3 },
        { name: "Submarine", quantity: 4, size: 2 },
      ];
      boats.forEach((boat) => {
        for (let i = 0; i < boat.quantity; i++) {
          let ship = new Ship(boat.name, boat.size);
          findSpaces(boat.size, ship);
        }
      });
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
      let space = this.board[coords[0]][coords[1]];
      return space === null ? coords : randomSpace(size, orientation);
    };

    const getCoords = (size, orientation) => {
      return orientation === 1
        ? [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * (size + 1)),
          ]
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
        test.push(this.board[coord[0]][coord[1]]);
      });
      return test.some((e) => e !== null);
    };

    const changeData = (data, boat) => {
      let newBoard = this.board.slice();
      data.forEach((coord) => {
        newBoard[coord[0]][coord[1]] = boat;
      });
      this.board = newBoard;
    };
  }
}

export default Gameboard;

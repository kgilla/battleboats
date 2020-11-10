class Player {
  constructor(enemyGameBoard) {
    this.enemyGameBoard = enemyGameBoard;
    this.makeMove = () => this.compMakeMove();
    this.lastMove = {};
    this.choicesLeft = this.makeChoiceArray();
    this.moveHistory = [];
  }

  // last move needs coords, isHit, isSunk, direction, prevMoves

  // Constructs array for all 100 potentail choices on gameboard
  makeChoiceArray = () => {
    let array = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        array.push({ x: x, y: y });
      }
    }
    return array;
  };

  // If player is computer makes move based on history
  compMakeMove = () => {
    if (this.lastMove) {
      let data = this.assessLastMove();
      if (data) {
        let result = this.makeMoveOnBoard(data.coords);
        this.logMove(data, result);
      }
    } else {
      this.makeRandomMove();
    }
  };

  // Makes random move because no history
  makeRandomMove = () => {
    let data = this.makeRandomChoice();
    let result = this.makeMoveOnBoard(data.coords);
    this.logMove(data, result);
  };

  // Generates random choice
  makeRandomChoice = () => {
    let choice = Math.floor(Math.random() * this.choicesLeft.length);
    let coords = [this.choicesLeft[choice].x, this.choicesLeft[choice].y];
    return { coords };
  };

  // Removes move from possible choices and uses gameboard method, return result
  makeMoveOnBoard = (move) => {
    console.log(move);
    let moveToRemove = this.choicesLeft.find(
      (m) => m.x == move[0] && m.y == move[1]
    );
    let newChoices = this.choicesLeft.slice();
    newChoices = newChoices.filter((m) => m !== moveToRemove);
    this.choicesLeft = newChoices;
    return this.enemyGameBoard.receiveAttack(move);
  };

  // Logs all appropriate lastMove data to be assessed next turn
  logMove = (data, results) => {
    let { coords, direction, prevMoves } = data;
    let { isHit, isSunk } = results;
    this.lastMove = {
      coords,
      isHit,
      isSunk,
      direction,
      prevMoves,
    };
    console.log(this.lastMove);
    this.moveHistory.push(this.lastMove);
  };

  // assesses lastMove data and directs to the appropriate handler
  assessLastMove = () => {
    if (this.lastMove.isHit && !this.lastMove.isSunk) {
      if (this.lastMove.direction) {
        // last move was a hit and direction
        let data = this.continueAttack();
        return data;
      } else {
        // last move was a hit and no direction
        let data = this.plotNextMove();
        return data;
      }
    } else if (this.lastMove.prevMoves && !this.lastMove.isSunk) {
      console.log("hello");
      // last move was a miss but prev move was a hit and has other options
      let data = this.determineAndFilter(this.lastMove.prevMoves);
      console.log({ thisIsData: data });
      return data;
    } else {
      // last move was a hit and ship is sunk or last move was a miss and no prev move hit
      this.makeRandomMove();
    }
  };

  determineAndFilter = (moves) => {
    if (moves.length > 1) {
      let nextMove = moves[Math.floor(Math.random() * moves.length)];
      let filteredMoves = moves.filter((m) => m !== nextMove);
      let newMoves = {
        coords: nextMove.coords,
        direction: nextMove.direction,
        prevMoves: filteredMoves,
      };
      return newMoves;
    } else {
      let newMoves = {
        coords: moves[0].coords,
        direction: moves[0].direction,
        prevMoves: [],
      };
      return newMoves;
    }
  };

  continueAttack = () => {
    let move = this.determineNextAttack();
    if (this.verifyMoveIsLegal(move)) {
      return move;
    } else {
      // need logic to go back the other way...
      this.makeRandomMove();
    }
  };

  determineNextAttack = () => {
    let c = this.lastMove.coords;
    if (this.lastMove.direction === "north") {
      return {
        coords: [c[0], c[1] - 1],
        direction: this.lastMove.direction,
        prevMoves: this.lastMove.prevMoves,
      };
    } else if (this.lastMove.direction === "east") {
      return {
        coords: [c[0] + 1, c[1]],
        direction: this.lastMove.direction,
        prevMoves: this.lastMove.prevMoves,
      };
    } else if (this.lastMove.direction === "south") {
      return {
        coords: [c[0], c[1] + 1],
        direction: this.lastMove.direction,
        prevMoves: this.lastMove.prevMoves,
      };
    } else {
      return {
        coords: [c[0] - 1, c[1]],
        direction: this.lastMove.direction,
        prevMoves: this.lastMove.prevMoves,
      };
    }
  };

  verifyMoveIsLegal = (move) => {
    return this.choicesLeft.some(
      (coord) => coord.x === move.coords[0] && coord.y === move.coords[1]
    );
  };

  // continue next move, check if move is legal
  plotNextMove = () => {
    let nextMoves = this.makeNextMoves();
    let filteredMoves = this.filterNextMoves(nextMoves);
    let data = this.determineAndFilter(filteredMoves);
    console.log(data);
    return data;
  };

  makeNextMoves = () => {
    let c = this.lastMove.coords;
    return [
      { coords: [c[0], c[1] - 1], direction: "north" },
      { coords: [c[0] - 1, c[1]], direction: "west" },
      { coords: [c[0], c[1] + 1], direction: "south" },
      { coords: [c[0] + 1, c[1]], direction: "east" },
    ];
  };

  filterNextMoves = (nextMoves) => {
    let filteredMoves = [];
    nextMoves.forEach((move) => {
      if (this.verifyMoveIsLegal(move)) {
        filteredMoves.push(move);
      }
    });
    return filteredMoves.length > 0 ? filteredMoves : "";
  };
}

export default Player;

class Player {
  constructor(enemyGameBoard) {
    this.enemyGameBoard = enemyGameBoard;
    this.makeMove = () => this.compMakeMove();
    this.lastMove = {};
    // last move needs coords, isHit, isSunk, direction, prevMoves
    this.choicesLeft = this.makeChoiceArray();
  }

  // Constructs array for all 100 potentail choices on gameboard
  makeChoiceArray = () => {
    let array = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        array.push([x, y]);
      }
    }
    return array;
  };

  // If player is computer makes move based on history
  compMakeMove = () => {
    if (this.lastMove) {
      let data = this.assessLastMove(this.lastMove);
      if (data) {
        let result = this.makeMoveOnBoard(this.choicesLeft[data.coords]);
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
    return { coords: this.choicesLeft[choice] };
  };

  // Removes move from possible choices and uses gameboard method, return result
  makeMoveOnBoard = (move) => {
    this.choicesLeft = this.choicesLeft.filter((m) => m !== move);
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
  };

  // assesses lastMove data and directs to the appropriate handler
  assessLastMove = (lastMove) => {
    if (lastMove.isHit) {
      if (lastMove.direction) {
        // last move was a hit and direction
        return this.continueAttack();
      } else {
        // last move was a hit and no direction
        return this.plotNextMove();
      }
    } else if (!this.lastMove.isHit && this.prevMoves) {
      // last move was a miss but prev move was a hit and has other options
      return this.determineAndFilter(this.lastMove.prevMoves);
    } else {
      // last move was a hit and ship is sunk or last move was a miss and no prev move hit
      this.makeRandomMove();
    }
  };

  determineAndFilter = (moves) => {
    if (moves.length > 1) {
      let nextMove = moves[Math.floor(Math.random() * moves.length)];
      let filteredMoves = moves.filter((m) => m !== nextMove);
      return { coords: nextMove, prevMoves: filteredMoves };
    } else {
      return { coords: moves[0], prevMoves: [] };
    }
  };

  continueAttack = () => {
    let c = this.lastMove.coords;
    if (this.lastMove.direction === "north") {
      return { coords: [c[0], c[1] + 1], direction: this.lastMove.direction };
    } else if (this.lastMove.direction === "east") {
      return { coords: [c[0] - 1, c[1]], direction: this.lastMove.direction };
    } else if (this.lastMove.direction === "south") {
      return { coords: [c[0], c[1] - 1], direction: this.lastMove.direction };
    } else {
      return { coords: [c[0] + 1, c[1]], direction: this.lastMove.direction };
    }
  };

  plotNextMove = () => {
    // creates array of most logical next moves
    let c = this.lastMove.coords;
    console.log(c);
    let nextMoves = [
      { coords: [c[0], c[1] + 1], direction: "north" },
      { coords: [c[0] - 1, c[1]], direction: "east" },
      { coords: [c[0], c[1] - 1], direction: "south" },
      { coords: [c[0] + 1, c[1]], direction: "west" },
    ];
    console.log(nextMoves);
    // filters out moves that have been made or don't exist
    let filteredMoves = nextMoves.filter((move) =>
      this.choicesLeft.includes(move.coords)
    );
    return this.determineAndFilter(filteredMoves);
  };
}

export default Player;

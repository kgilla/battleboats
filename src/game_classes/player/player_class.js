class Player {
  constructor(enemyGameBoard) {
    this.enemyGameBoard = enemyGameBoard;
    this.choicesLeft = this.makeChoiceArray();
    this.smartChoices = this.makeSmartChoices();
    this.lastMove = {};
    this.hits = [];
  }

  userMakeMove = (coords) => {
    let move = { coords };
    if (this.verifyMoveIsLegal(move)) {
      return this.makeMoveOnBoard(coords);
    } else {
      return;
    }
  };

  makeChoiceArray = () => {
    let array = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        array.push({ x: x, y: y });
      }
    }
    return array;
  };

  makeSmartChoiceArray = () => {
    let array = [0];
    let i = 0;
    while (i < 100) {
      for (let x = 0; x < 4; x++) {
        i += 2;
        array.push(i);
      }
      i % 2 === 0 ? (i += 3) : (i += 1);
      array.push(i);
    }
    return array;
  };

  makeSmartChoices = () => {
    let array = this.makeSmartChoiceArray();
    let newArray = [];
    array.forEach((i) => newArray.push(this.choicesLeft[i]));
    newArray = newArray.slice(0, 50);
    return newArray;
  };

  compMakeMove = () => {
    if (this.lastMove) {
      let data = this.assessLastMove();
      let result = this.makeMoveOnBoard(data.coords);
      this.logMove(data, result);
      return result;
    } else {
      return this.makeRandomMove();
    }
  };

  makeRandomMove = () => {
    let data = this.makeRandomChoice();
    let result = this.makeMoveOnBoard(data.coords);
    this.logMove(data, result);
    return result;
  };

  makeRandomChoice = () => {
    let choice = Math.floor(Math.random() * this.smartChoices.length);
    let coords = [this.smartChoices[choice].x, this.smartChoices[choice].y];
    return { coords };
  };

  filterChoices = (coords, choiceArray) => {
    let array = choiceArray.slice();
    let choice = array.find((c) => c.x === coords[0] && c.y === coords[1]);
    array = array.filter((c) => c !== choice);
    return array;
  };

  makeMoveOnBoard = (move) => {
    this.choicesLeft = this.filterChoices(move, this.choicesLeft);
    this.smartChoices = this.filterChoices(move, this.smartChoices);
    return this.enemyGameBoard.receiveAttack(move);
  };

  logMove = (data, results) => {
    let { coords, direction, prevMoves, continueAttack } = data;
    let { isHit, isSunk, boat } = results;
    this.lastMove = {
      coords,
      isHit,
      isSunk,
      direction,
      prevMoves,
      boat,
      continueAttack,
    };
    if (this.lastMove.isHit && !this.lastMove.isSunk) {
      this.hits.push(this.lastMove);
    }
    if (this.lastMove.isSunk) {
      this.filterHits();
    }
  };

  assessLastMove = () => {
    if (this.lastMove.isHit && !this.lastMove.isSunk) {
      if (this.lastMove.direction) {
        return this.continueAttack();
      } else {
        return this.plotNextMove();
      }
    } else if (this.lastMove.continueAttack && !this.lastMove.isSunk) {
      return this.attemptReverse(this.lastMove);
    } else if (this.lastMove.prevMoves && !this.lastMove.isSunk) {
      return this.determineAndFilter(this.lastMove.prevMoves);
    } else if (this.hits.length > 0) {
      let data = this.useHitsArray();
      return data;
    } else {
      return this.makeRandomChoice();
    }
  };

  useHitsArray = () => {
    this.lastMove = this.hits[0];
    let nextMoves = this.makeNextMoves(this.lastMove.coords);
    let filteredMoves = this.filterNextMoves(nextMoves);
    if (filteredMoves.length > 0) {
      this.filterHits();
      return this.determineAndFilter(filteredMoves);
    } else {
      this.filterHits();
      if (this.hits.length > 0) {
        return this.useHitsArray();
      } else {
        return this.makeRandomChoice();
      }
    }
  };

  determineAndFilter = (moves) => {
    if (moves.length > 1) {
      let nextMove = moves[Math.floor(Math.random() * moves.length)];
      let filteredMoves = moves.filter((m) => m !== nextMove);
      return {
        coords: nextMove.coords,
        direction: nextMove.direction,
        prevMoves: filteredMoves,
      };
    } else {
      return {
        coords: moves[0].coords,
        direction: moves[0].direction,
        prevMoves: "",
      };
    }
  };

  continueAttack = () => {
    let move = this.determineNextAttack(this.lastMove.coords);
    if (this.verifyMoveIsLegal(move)) {
      return move;
    } else {
      return this.attemptReverse(this.lastMove);
    }
  };

  attemptReverse = (move) => {
    let newDirection = this.reverseDirection(move.direction);
    let newMove = move.prevMoves.find((m) => m.direction === newDirection);
    if (this.verifyMoveIsLegal(newMove)) {
      return newMove;
    } else if (this.hits.length > 0) {
      return this.useHitsArray();
    } else {
      return this.makeRandomChoice();
    }
  };

  reverseDirection = (direction) => {
    if (direction === "north") {
      return "south";
    } else if (direction === "south") {
      return "north";
    } else if (direction === "east") {
      return "west";
    } else {
      return "east";
    }
  };

  determineNextAttack = (c) => {
    let coords = "";
    if (this.lastMove.direction === "north") {
      coords = [c[0], c[1] - 1];
    } else if (this.lastMove.direction === "east") {
      coords = [c[0] + 1, c[1]];
    } else if (this.lastMove.direction === "south") {
      coords = [c[0], c[1] + 1];
    } else {
      coords = [c[0] - 1, c[1]];
    }
    return {
      coords,
      direction: this.lastMove.direction,
      prevMoves: this.lastMove.prevMoves,
      continueAttack: true,
    };
  };

  verifyMoveIsLegal = (move) => {
    if (move) {
      let result = this.choicesLeft.some(
        (coord) => coord.x === move.coords[0] && coord.y === move.coords[1]
      );
      return result;
    } else {
      return false;
    }
  };

  plotNextMove = () => {
    let nextMoves = this.makeNextMoves(this.lastMove.coords);
    let filteredMoves = this.filterNextMoves(nextMoves);
    return filteredMoves.length > 0
      ? this.determineAndFilter(filteredMoves)
      : this.makeRandomChoice();
  };

  makeNextMoves = (move) => {
    return [
      { coords: [move[0], move[1] - 1], direction: "north" },
      { coords: [move[0] - 1, move[1]], direction: "west" },
      { coords: [move[0], move[1] + 1], direction: "south" },
      { coords: [move[0] + 1, move[1]], direction: "east" },
    ];
  };

  filterNextMoves = (nextMoves) => {
    let filteredMoves = [];
    nextMoves.forEach((move) => {
      if (this.verifyMoveIsLegal(move)) {
        filteredMoves.push(move);
      }
    });
    return filteredMoves;
  };

  filterHits = () => {
    this.hits = this.hits.filter((hit) => !hit.boat.isSunk);
  };
}

export default Player;

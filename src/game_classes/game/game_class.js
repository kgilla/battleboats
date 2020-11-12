import Gameboard from "../gameboard/gameboard_class";
import Player from "../player/player_class";

class Game {
  constructor() {
    this.playerOne = this.createPlayer(false);
    this.playerTwo = this.createPlayer(true);
    this.gameOver = false;
  }

  handleTurn = (coords) => {
    let user = this.userTurn(coords);
    if (user) {
      let comp = this.compTurn();
      return { user, comp };
    } else {
      return;
    }
  };

  userTurn = (coords) => {
    let user = this.playerOne.userMakeMove(coords);
    if (user && user.isSunk) {
      let win = this.checkWin(this.playerOne);
    }
    return user;
  };

  compTurn = () => {
    let comp = this.playerTwo.compMakeMove();
    if (comp.isSunk) {
      let win = this.checkWin(this.playerTwo);
    }
    return comp;
  };

  checkWin = (player) => {
    if (player.enemyGameBoard.shipsLeft === 0) {
      console.log("winner");
    }
  };

  createPlayer = (computer) => {
    let game = new Gameboard();
    game.generateRandomBoats();
    return new Player(game, computer);
  };
}

export default Game;

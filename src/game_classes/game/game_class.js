import Gameboard from "../gameboard/gameboard_class";
import Player from "../player/player_class";

class Game {
  constructor() {
    this.playerOne = this.createPlayer(false);
    this.playerTwo = this.createPlayer(true);
    this.gameOver = false;
  }

  userTurn = (coords) => {
    let user = this.playerOne.userMakeMove(coords);
    if (user) {
      user.win = this.checkWin(this.playerOne);
      return user;
    } else {
      return;
    }
  };

  compTurn = () => {
    let comp = this.playerTwo.compMakeMove();
    comp.win = this.checkWin(this.playerTwo);
    return comp;
  };

  checkWin = (player) => {
    return player.enemyGameBoard.shipsLeft === 0 ? true : false;
  };

  createPlayer = (computer) => {
    let game = new Gameboard();
    game.generateRandomBoats();
    return new Player(game, computer);
  };
}

export default Game;

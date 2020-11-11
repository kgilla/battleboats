import Gameboard from "../gameboard/gameboard_class";
import Player from "../player/player_class";

class Game {
  constructor() {
    this.playerOne = this.createPlayer(false);
    this.playerTwo = this.createPlayer(true);
    this.currentPlayer = this.playerOne;
    this.gameOver = false;
  }

  handleUserTurn = (coords) => {
    if (this.currentPlayer === this.playerOne) {
      let response = this.playerOne.userMakeMove(coords);
      this.switchCurrentPlayer();
      return response;
    }
  };

  handleCompTurn = () => {
    let response = this.playerTwo.compMakeMove();
    this.switchCurrentPlayer();
    return response;
  };

  switchCurrentPlayer = () => {
    this.currentPlayer =
      this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
    if (this.currentPlayer === this.playerTwo) {
      this.handleCompTurn();
    }
  };

  createPlayer = (computer) => {
    let game = new Gameboard();
    game.generateRandomBoats();
    let player = new Player(game, computer);
    return player;
  };
}

export default Game;

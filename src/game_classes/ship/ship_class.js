class Ship {
  constructor(name, length) {
    this.name = name;
    this.hitsLeft = length;
    this.isSunk = false;
    this.length = length;
    this.hit = () => this.handleHit();
  }

  handleHit = () => {
    this.hitsLeft--;
    if (this.hitsLeft === 0) {
      this.isSunk = true;
      return { isSunk: true, message: this.name + " has been sunk!" };
    } else {
      return { isSunk: false, message: "You hit something" };
    }
  };
}

export default Ship;

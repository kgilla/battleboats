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
      return this.name + " Has been sunk!";
    } else {
      return "You hit " + this.name;
    }
  };
}

export default Ship;

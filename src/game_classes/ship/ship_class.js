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
      console.log("sunk!");
      this.isSunk = true;
      console.log(this);
      return { isSunk: true, name: this.name };
    } else {
      return { isSunk: false };
    }
  };
}

export default Ship;

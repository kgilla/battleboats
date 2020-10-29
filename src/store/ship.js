class Ship {
  constructor(name, length) {
    this.name = name;
    this.hitsLeft = length;
    this.isSunk = false;
    this.length = length;
    this.hit = () => {
      this.hitsLeft--;
      if (this.hitsLeft === 0) {
        this.isSunk = true;
        let message = this.name + " Has been sunk!";
        console.log(message);
        return message;
      }
    };
  }
}

export default Ship;

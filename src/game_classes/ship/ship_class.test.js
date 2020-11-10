import Ship from "./ship_class";

test("ship returns isSunk status with a hit()", () => {
  let ship = new Ship("test", 5);
  expect(ship.hit()).toEqual({ isSunk: false });
});

test("ship loses health with hit method", () => {
  let ship = new Ship("test", 5);
  ship.hit();
  expect(ship.hitsLeft).toBe(4);
});

test("ship returns isSunk as true and gives name", () => {
  let ship = new Ship("test", 1);
  expect(ship.hit()).toEqual({ isSunk: true, name: ship.name });
});

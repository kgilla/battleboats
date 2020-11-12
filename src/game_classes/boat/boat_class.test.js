import Boat from "./boat_class";

test("boat returns isSunk status with a hit()", () => {
  let boat = new Boat("test", 5);
  expect(boat.hit()).toEqual({ isSunk: false });
});

test("boat loses health with hit method", () => {
  let boat = new Boat("test", 5);
  boat.hit();
  expect(boat.hitsLeft).toBe(4);
});

test("boat returns isSunk as true and gives name", () => {
  let boat = new Boat("test", 1);
  expect(boat.hit()).toEqual({ isSunk: true, name: boat.name });
});

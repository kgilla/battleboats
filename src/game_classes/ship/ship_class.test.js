import Ship from "./ship_class";

test("ship returns message with hit method", () => {
  let ship = new Ship("test", 5);
  expect(ship.hit()).toBe("You hit something!");
});

// test("ship loses health with hit method", () => {
//   let ship = new Ship("test", 5);
//   expect(ship.hit()).toBe("You hit something!");
// });

test("ship returns message after losing all lives", () => {
  let ship = new Ship("test", 1);
  expect(ship.hit()).toBe(ship.name + " has been sunk!");
});

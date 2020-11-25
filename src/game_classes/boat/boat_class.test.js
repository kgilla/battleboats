import Boat from "./boat_class";

test("boat registers hit and loses health", () => {
  let boat = new Boat("test", 5);
  boat.hit();
  expect(boat).toHaveProperty("isSunk", false);
  expect(boat.hitsLeft).toBe(4);
});

test("boat returns isSunk as true", () => {
  let boat = new Boat("test", 1);
  boat.hit();
  expect(boat).toHaveProperty("isSunk", true);
});

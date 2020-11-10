import Player from "./player_class";

test("Should make an array of objects containing all 100 xY coordinates", () => {
  const player = new Player();
  expect(player.choicesLeft.length).toBe(100);
  expect(player.choicesLeft).toContainEqual({ x: 6, y: 9 });
});

// test("should produce a random coord in between 1-10 for x and y", () => {
//   const player = new Player();
//   expect(player.makeRandomChoice()).toBe();
// });

test("correctly creates array of legal move options", () => {
  const player = new Player();
  player.lastMove = { coords: [2, 7], isHit: true, isSunk: false };
  let moves = player.makeNextMoves();
  expect(moves).toContainEqual({ coords: [2, 8], direction: "north" });
  expect(moves).toContainEqual({ coords: [1, 7], direction: "west" });
});

test("filters out all moves that are illegal", () => {
  const player = new Player();
  player.lastMove = { coords: [2, 9], isHit: true, isSunk: false };
  let moves = player.makeNextMoves();
  expect(player.filterNextMoves(moves).length).toBe(3);
});

test("filters", () => {
  const player = new Player();
  let moves = [
    {
      coords: [6, 6],
      direction: "north",
    },
    {
      coords: [5, 5],
      direction: "west",
    },
    {
      coords: [6, 4],
      direction: "south",
    },
    {
      coords: [7, 5],
      direction: "east",
    },
  ];
  expect(player.filterNextMoves(moves).length).toBe(4);
});

test("Handles an array of length 1", () => {
  const player = new Player();
  let moves = [{ coords: [3, 7], direction: "north" }];
  expect(player.determineAndFilter(moves)).toEqual({
    coords: [3, 7],
    direction: "north",
    prevMoves: [],
  });
});

test("Finds coords within available coords", () => {
  const player = new Player();
  let move = { coords: [3, 7], direction: "north" };
  let badMove = { coords: [5, 44], direction: "north" };
  expect(player.verifyMoveIsLegal(move)).toBe(true);
  expect(player.verifyMoveIsLegal(badMove)).toBe(false);
});

// test("Should receive an array of choices back", () => {
//   const player = new Player();
//   player.lastMove = {
//     coords: [2, 9],
//     isHit: true,
//     isSunk: false,
//     direction: "",
//     prevMoves: [],
//   };
//   let data = player.plotNextMove();
//   expect(data.prevMoves.length).toBe(2);
// });

test("continues in same direction if isHit and direction is present", () => {
  const player = new Player();
  player.lastMove = {
    coords: [2, 9],
    isHit: true,
    isSunk: false,
    direction: "north",
    prevMoves: [],
  };
  expect(player.determineNextAttack(player.lastMove)).toEqual({
    coords: [2, 8],
    direction: "north",
  });
});

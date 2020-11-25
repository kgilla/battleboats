import Gameboard from "./gameboard_class";

test("Gameboard is created and is appropriate size", () => {
  let testGame = new Gameboard();
  expect(testGame.board.length).toBe(10);
  expect(testGame.board[2].length).toBe(10);
});

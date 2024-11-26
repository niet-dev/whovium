import { seedBoards } from "@/stub-server/seed";

describe("seedBoards()", () => {
  const numBoards = 10;

  it("creates the number of boards passed to it", () => {
    const boards = seedBoards(numBoards);

    expect(boards).toHaveLength(numBoards);
  });

  it("returns the same boards each time", () => {
    const boards = seedBoards(numBoards);
    const moreBoards = seedBoards(numBoards);

    expect(moreBoards).toEqual(boards);
  });
});

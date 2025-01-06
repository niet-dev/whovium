import type { Card as GameCardType } from "@prisma/client";
import { render, screen } from "@testing-library/react";

import GameCardGrid from "@/components/GameCardGrid";

const NUM_TEST_CARDS = 30;

const createGameCardList = () => {
  const cardList: GameCardType[] = [];

  for (let i = 0; i < NUM_TEST_CARDS; i++) {
    cardList.push({
      boardId: 1,
      id: i,
      imgSrc: `test-imgSrc-${i}`,
      name: `test-name-${i}`,
    });
  }

  return cardList;
};

describe("GameCardGrid", () => {
  const cardList = createGameCardList();

  it("renders when no cards are passed to it", () => {
    render(<GameCardGrid />);
    expect(screen.getByLabelText("Game card grid")).toBeTruthy();
  });

  it("renders when an empty card list is passed to it", () => {
    render(<GameCardGrid cards={[]} />);
    expect(screen.getByLabelText("Game card grid")).toBeTruthy();
  });

  it("renders when a list of cards is passed to it", () => {
    render(<GameCardGrid cards={cardList} />);
    expect(screen.getByLabelText("Game card grid")).toBeTruthy();
  });

  it("renders all cards passed to it", () => {
    render(<GameCardGrid cards={cardList} />);
    expect(screen.getAllByTestId("Game card")).toHaveLength(NUM_TEST_CARDS);
  });

  it("passes its color to its cards", () => {
    render(<GameCardGrid cards={cardList} color="red" />);
    const headings = screen.queryAllByRole("heading", { level: 2 });
    expect(headings[0]).toHaveAttribute(
      "class",
      expect.stringContaining("red"),
    );
  });
});

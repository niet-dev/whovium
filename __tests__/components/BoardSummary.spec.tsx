import { render, screen, within } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import BoardSummary from "@/components/BoardSummary";
import { Board } from "@/lib/types";

const board: Board = {
  title: faker.book.title(),
  createdBy: faker.book.author(),
  description: faker.lorem.sentences(2),
};

describe("BoardSummary", () => {
  beforeEach(() => {
    render(<BoardSummary board={board} />);
  });

  it("is presented as a singular block of content", () => {
    const boardComponent = screen.queryByRole("article");

    expect(boardComponent).toBeTruthy();
  });

  it("displays the board's title", () => {
    const boardHeadingGroup = screen.getByRole("group");
    const boardTitle = within(boardHeadingGroup).queryByRole("heading", {
      level: 2,
    });

    expect(boardTitle).toHaveTextContent(board.title);
  });

  it("displays the board creator's name", () => {
    const boardHeadingGroup = screen.getByRole("group");
    const boardCreatedBy = within(boardHeadingGroup).queryByRole("paragraph");

    expect(boardCreatedBy).toHaveTextContent(board.createdBy);
  });

  it("displays the board's description", () => {
    const boardDescription = screen.queryByRole("paragraph", {
      name: "Board description",
    });

    expect(boardDescription).toHaveTextContent(board.description);
  });
});

import { render, screen, within } from "@testing-library/react";
import BoardSummary from "@/components/BoardSummary";
import { Board } from "@/lib/types";

const board: Board = {
  title: "Classic",
  createdBy: "niet",
  description:
    "The default experience. " +
    "These people may not belong to a franchise, but they sure look funny!",
};

describe("BoardSummary", () => {
  beforeEach(() => {
    render(<BoardSummary board={board} />);
  });

  it("is presented as a singular block of content", () => {
    const board = screen.queryByRole("article");

    expect(board).toBeTruthy();
  });

  it("displays the board's title", () => {
    const boardHeadingGroup = screen.getByRole("group");
    const boardTitle = within(boardHeadingGroup).queryByRole("heading", {
      level: 2,
    });

    expect(boardTitle).toHaveTextContent("Classic");
  });

  it("displays the board creator's name", () => {
    const boardHeadingGroup = screen.getByRole("group");
    const boardCreatedBy = within(boardHeadingGroup).queryByRole("paragraph");

    expect(boardCreatedBy).toHaveTextContent("niet");
  });

  it("displays the board's description", () => {
    const boardDescription = screen.queryByRole("paragraph", {
      name: "Board description",
    });

    expect(boardDescription).toHaveTextContent("default experience.");
  });
});

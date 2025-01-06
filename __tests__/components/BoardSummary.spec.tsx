import { faker } from "@faker-js/faker";
import { render, screen, within } from "@testing-library/react";

import { Board } from "@/lib/types";
import BoardSummary from "@/components/BoardSummary";

describe("BoardSummary", () => {
  const board: Board = {
    id: faker.number.int(100),
    imgSrc: "https://placehold.co/300x300",
    title: faker.book.title(),
    createdBy: {
      username: faker.internet.username(),
      id: faker.number.int(100),
    },
    description: faker.lorem.sentences(2),
  };

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
    const boardCreatedBy = within(boardHeadingGroup).queryByRole("paragraph", {
      name: "Created by",
    });

    expect(boardCreatedBy).toHaveTextContent(board.createdBy.username);
  });

  it("displays the board's description", () => {
    const boardDescription = screen.queryByRole("paragraph", {
      name: "Board description",
    });

    expect(boardDescription).toHaveTextContent(board.description);
  });

  it("wraps the board's title in a link", () => {
    const boardLink = screen.queryByRole("link", {
      name: board.title,
    });

    expect(boardLink).toBeTruthy();
  });

  it("links the board's title to its detail page", () => {
    const boardLink = screen.getByRole("link", {
      name: board.title,
    });

    expect(boardLink).toHaveAttribute("href", `boards/${board.id}`);
  });

  it("wraps the board's author in a link", () => {
    const boardAuthorLink = screen.getByRole("link", {
      name: board.createdBy.username,
    });

    expect(boardAuthorLink).toBeTruthy();
  });

  it("links the board's author to its author page", () => {
    const boardAuthorLink = screen.getByRole("link", {
      name: board.createdBy.username,
    });

    expect(boardAuthorLink).toHaveAttribute(
      "href",
      `users/${board.createdBy.username}`,
    );
  });

  it("displays an image", () => {
    const boardImage = screen.queryByRole("img");

    expect(boardImage).toBeTruthy();
  });

  it("displays an image with alt text containing the board's title", () => {
    const boardImage = screen.getByRole("img");

    expect(boardImage.getAttribute("alt")).toContain(board.title);
  });

  it("displays a play button", () => {
    const playButton = screen.queryByRole("link", { name: "Play" });

    expect(playButton).toBeTruthy();
  });

  it("links the play button to its board's detail page", () => {
    const playButton = screen.getByRole("link", { name: "Play" });

    expect(playButton).toHaveAttribute("href", `boards/${board.id}`);
  });
});

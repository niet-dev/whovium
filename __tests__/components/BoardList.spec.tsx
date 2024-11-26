import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import BoardList from "@/components/BoardList";

describe("BoardList", () => {
  const boards: Board[] = [];
  const numberOfBoards = 10;

  beforeAll(() => {
    for (let i = 0; i < numberOfBoards; i++) {
      boards.push({
        id: faker.string.uuid(),
        title: faker.book.title(),
        createdBy: faker.book.author(),
        description: faker.lorem.sentences(2),
      });
    }
  });

  beforeEach(() => {
    render(<BoardList boards={boards} />);
  });

  it("displays a list of boards", () => {
    const boardList = screen.queryByRole("list");

    expect(boardList).toBeTruthy();
  });

  it("displays an item for each board passed to it", () => {
    const boardCount = screen.getAllByRole("listitem").length;

    expect(boardCount).toBe(numberOfBoards);
  });
});

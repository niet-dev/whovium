import HomePage from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("HomePage", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it("renders a heading", () => {
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent(/whovium/i);
  });

  it("links to the board list page", () => {
    const boardListLink = screen.getByRole("link", { name: /boards/i });

    expect(boardListLink).toBeDefined();
  });
});

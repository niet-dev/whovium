import { render, screen } from "@testing-library/react";
import BoardListPage from "@/app/boards/page";

describe("BoardListPage", () => {
  beforeEach(() => {
    render(<BoardListPage />);
  });

  it("displays a heading", () => {
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent(/boards/i);
  });
});

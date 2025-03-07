import { render, screen } from "@testing-library/react";

import PaginationLink from "@/components/boards/list/pagination-link";

describe("PaginationLink", () => {
  it("Links to the path passed to it", () => {
    render(<PaginationLink href="/test-path" />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/test-path");
  });

  it("renders a link when isDisabled is set to false", () => {
    render(<PaginationLink href="/test-path" disabled={false} />);

    expect(screen.queryByRole("link")).toBeTruthy();
  });

  it("does not render a link when isDisabled is set to true", () => {
    render(<PaginationLink href="/test-path" disabled />);

    expect(screen.queryByRole("link")).toBeFalsy();
  });

  it("displays a left arrow icon when direction is set to left", () => {
    render(
      <PaginationLink href="/test-path" disabled={false} direction="left" />,
    );

    expect(screen.queryByLabelText("Left arrow icon")).toBeTruthy();
  });

  it("displays a right arrow icon when direction is set to right", () => {
    render(
      <PaginationLink href="/test-path" disabled={false} direction="right" />,
    );

    expect(screen.queryByLabelText("Right arrow icon")).toBeTruthy();
  });
});

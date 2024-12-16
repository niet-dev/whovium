import { render, screen } from "@testing-library/react";

import Pagination from "@/components/Pagination";

import {
  mockedPathname,
  mockedQuery,
  useSearchParams,
} from "../../__mocks__/next/navigation";

describe("Pagination", () => {
  it("Renders to the screen", () => {
    render(<Pagination />);

    expect(screen.queryByRole("region", { name: "Pagination" })).toBeTruthy();
  });

  it("Renders a left page link", () => {
    render(<Pagination />);

    expect(screen.queryByLabelText("left page link")).toBeTruthy();
  });

  it("Renders a right page link", () => {
    render(<Pagination />);

    expect(screen.queryByLabelText("right page link")).toBeTruthy();
  });

  it("Displays a link to the previous page", () => {
    render(<Pagination />);

    expect(screen.getByLabelText("left page link")).toHaveAttribute(
      "href",
      `${mockedPathname}?query=${mockedQuery}&page=1`,
    );
  });

  it("Displays a link to the next page", () => {
    render(<Pagination />);

    expect(screen.getByLabelText("right page link")).toHaveAttribute(
      "href",
      `${mockedPathname}?query=${mockedQuery}&page=3`,
    );
  });

  it("Disables previous page navigation when current page is 1", () => {
    useSearchParams.mockImplementationOnce(
      () => new URLSearchParams({ query: mockedQuery, page: 1 }),
    );
    render(<Pagination />);

    expect(screen.queryByLabelText("disabled left page link")).toBeTruthy();
  });

  it("Disables next page navigation when current page is the last page", () => {
    useSearchParams.mockImplementationOnce(
      () => new URLSearchParams({ query: mockedQuery, page: 10 }),
    );
    render(<Pagination pageCount={10} />);

    expect(screen.queryByLabelText("disabled right page link")).toBeTruthy();
  });

  it("Defaults to page 1", () => {
    useSearchParams.mockImplementationOnce(
      () => new URLSearchParams({ query: mockedQuery }),
    );
    render(<Pagination />);

    expect(screen.getByLabelText("right page link")).toHaveAttribute(
      "href",
      `${mockedPathname}?query=${mockedQuery}&page=2`,
    );
  });
});

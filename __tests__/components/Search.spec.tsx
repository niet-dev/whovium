import Search from "@/components/Search";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const defaultQuery = "test";
const placeholderText = "Placeholder text...";

const replaceMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  useSearchParams: () => new URLSearchParams({ query: defaultQuery }),
  usePathname: () => "/mocked-pathname",
}));

describe("Search", () => {
  it("renders to the screen", () => {
    render(<Search placeholder={placeholderText} />);
    const searchComponent = screen.queryByRole("searchbox");

    expect(searchComponent).toBeTruthy();
  });

  it("displays the placeholder text passed to it", () => {
    render(<Search placeholder={placeholderText} />);
    const searchComponent = screen.getByRole("searchbox");

    expect(searchComponent).toHaveAttribute("placeholder", placeholderText);
  });

  it("calls 'replace()' on value change", async () => {
    const user = userEvent.setup();
    const textToTest = "t";

    render(<Search placeholder={placeholderText} />);
    const searchComponent = screen.getByRole("searchbox");

    await user.click(searchComponent);
    await user.keyboard(textToTest);

    expect(replaceMock).toHaveBeenCalledTimes(1);
  });

  it("adds query parameters based on inputted text", async () => {
    const user = userEvent.setup();
    const textToTest = "test";

    render(<Search placeholder={placeholderText} />);
    const searchComponent = screen.getByRole("searchbox");

    await user.click(searchComponent);
    await user.keyboard(textToTest);

    expect(replaceMock).toHaveBeenLastCalledWith(
      expect.stringContaining(`?query=${textToTest}`),
    );
  });

  it("deletes query parameters if there is no input", async () => {
    const user = userEvent.setup();

    render(<Search placeholder={placeholderText} />);
    const searchComponent = screen.getByRole("searchbox");

    await user.click(searchComponent);
    for (let i = 0; i < defaultQuery.length; i++) {
      await user.keyboard("{Backspace}");
    }

    expect(replaceMock).toHaveBeenLastCalledWith(
      expect.not.stringContaining("query"),
    );
  });

  it("passes existing query parameters as a default value to input", () => {
    render(<Search placeholder={placeholderText} />);
    const searchComponent = screen.getByRole("searchbox");

    expect(searchComponent).toHaveAttribute("value", "test");
  });
});

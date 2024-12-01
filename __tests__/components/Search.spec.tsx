import Search from "@/components/Search";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const replaceMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Search", () => {
  const placeholderText = "Placeholder text...";

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

    expect(replaceMock).toHaveBeenCalledWith(
      expect.stringContaining(`?query=${textToTest}`),
    );
  });

  it("deletes query parameters if there is no input", async () => {
    const user = userEvent.setup();
    const textToTest = "t";

    render(<Search placeholder={placeholderText} />);
    const searchComponent = screen.getByRole("searchbox");

    await user.click(searchComponent);
    await user.keyboard(textToTest);
    await user.keyboard("{Backspace}");

    expect(replaceMock).toHaveBeenLastCalledWith(
      expect.not.stringContaining("query"),
    );
  });
});

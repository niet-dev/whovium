import { render, screen } from "@testing-library/react";

import ColorToggle from "@/components/ColorToggle";

describe("ColorToggle", () => {
  it("renders a switch", () => {
    render(<ColorToggle />);
    expect(screen.queryByRole("switch")).toBeTruthy();
  });

  it("is labeled appropriately", () => {
    render(<ColorToggle />);
    expect(screen.queryByLabelText("Card Color")).toBeTruthy();
  });

  it("calls a handler when the switch is clicked", () => {
    const handleColorChange = jest.fn();
    render(<ColorToggle handleColorChange={handleColorChange} />);

    screen.getByRole("switch").click();
    expect(handleColorChange).toHaveBeenCalledTimes(1);
  });

  it("adds its className prop to its outermost div element", () => {
    const testValue = "test-class-value";
    render(<ColorToggle className={testValue} />);
    expect(
      screen.getByLabelText("Color toggle switch container"),
    ).toHaveAttribute("class", expect.stringContaining(testValue));
  });
});

import type { Card as GameCardType } from "@prisma/client";
import { render, screen } from "@testing-library/react";

import GameCard from "@/components/GameCard";

import { mockedAnimate } from "../../__mocks__/motion/react";

describe("GameCard", () => {
  const testCard: GameCardType = {
    imgSrc: "test-imgSrc",
    name: "test-name",
  };

  it("renders", () => {
    render(<GameCard card={testCard} color="red" />);
    expect(screen.getByLabelText(testCard.name)).toBeTruthy();
  });

  it("displays an image with alt text", () => {
    render(<GameCard card={testCard} color="red" />);
    expect(screen.getByAltText(`Image for card ${testCard.name}`)).toBeTruthy();
  });

  it("displays the name of the card", () => {
    render(<GameCard card={testCard} color="red" />);
    expect(screen.getByText(testCard.name)).toBeTruthy();
  });

  it("sets text color appropriately when color is red", () => {
    render(<GameCard card={testCard} color="red" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
      "class",
      expect.stringContaining("red"),
    );
  });

  it("sets text color appropriately when color is blue", () => {
    render(<GameCard card={testCard} color="blue" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
      "class",
      expect.stringContaining("blue"),
    );
  });

  it("sets text color to blue when color is not red or blue", () => {
    render(<GameCard card={testCard} color="green" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
      "class",
      expect.stringContaining("blue"),
    );
  });

  it("sets text color to blue when no color is specified", () => {
    render(<GameCard card={testCard} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
      "class",
      expect.stringContaining("blue"),
    );
  });

  it("calls animate when clicked", () => {
    render(<GameCard card={testCard} color="red" />);
    screen.getByTestId("motion div").click();
    expect(mockedAnimate).toHaveBeenCalledTimes(1);
  });
});

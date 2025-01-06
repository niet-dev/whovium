"use client";

import { useState } from "react";

import { Card as GameCardType } from "@prisma/client";

import ColorToggle from "./ColorToggle";
import GameCardCarousel from "./GameCardCarousel";
import GameCardGrid from "./GameCardGrid";

const ColorWrapper = ({ cards }: { cards: GameCardType[] }) => {
  const [color, setColor] = useState<"red" | "blue">("red");

  const handleColorChange = () => {
    setColor(color === "red" ? "blue" : "red");
  };

  return (
    <div aria-label="Color wrapper">
      <ColorToggle
        handleColorChange={(e) => handleColorChange(e)}
        className="flex justify-center"
      />
      <div className="mx-4 xl:hidden">
        <GameCardCarousel cards={cards} color={color} />
      </div>
      <div className="hidden xl:block">
        <GameCardGrid cards={cards} color={color} />
      </div>
    </div>
  );
};

export default ColorWrapper;

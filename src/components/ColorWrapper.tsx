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
    <div>
      <ColorToggle handleColorChange={(e) => handleColorChange(e)} />
      <div className="xl:hidden">
        <GameCardCarousel cards={cards} color={color} />
      </div>
      <div className="invisible xl:visible">
        <GameCardGrid cards={cards} color={color} />
      </div>
    </div>
  );
};

export default ColorWrapper;

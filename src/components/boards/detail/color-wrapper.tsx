"use client";

import { useState } from "react";

import { Card as GameCardType } from "@prisma/client";

import ColorToggle from "@/components/boards/detail/color-toggle";
import GameCardCarousel from "@/components/boards/detail/game-card-carousel";
import GameCardGrid from "@/components/boards/detail/game-card-grid";

export default function ColorWrapper({ cards }: { cards: GameCardType[] }) {
  const [color, setColor] = useState<"red" | "blue">("red");

  const handleColorChange = () => {
    setColor(color === "red" ? "blue" : "red");
  };

  return (
    <div aria-label="Color wrapper">
      <ColorToggle
        handleColorChange={handleColorChange}
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
}

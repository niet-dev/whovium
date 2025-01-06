import type { Card as GameCardType } from "@prisma/client";

import GameCard from "./GameCard";

const GameCardGrid = ({
  cards = [],
  color,
}: {
  cards: GameCardType[];
  color: "red" | "blue";
}) => {
  return (
    <div
      aria-label="Game card grid"
      className="my-8 grid grid-cols-4 gap-4 rounded-lg border py-8 shadow-lg 2xl:grid-cols-5"
    >
      {cards.map((card) => (
        <div key={card.id} className="flex items-center justify-center">
          <GameCard key={card.id} card={card} color={color} />
        </div>
      ))}
    </div>
  );
};

export default GameCardGrid;

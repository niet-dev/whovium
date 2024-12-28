import type { Card as GameCardType } from "@prisma/client";

import GameCard from "./GameCard";

const GameCardGrid = ({
  cards,
  color,
}: {
  cards: GameCardType[];
  color: "red" | "blue";
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 py-8 2xl:grid-cols-5">
      {cards.map((card) => (
        <div key={card.id} className="flex items-center justify-center">
          <GameCard key={card.id} card={card} color={color} />
        </div>
      ))}
    </div>
  );
};

export default GameCardGrid;

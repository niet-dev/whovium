import type { Card as GameCardType } from "@prisma/client";

import GameCard from "./GameCard";

const GameCardGrid = ({ cards }: { cards: GameCardType[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 py-4">
      {cards.map((card) => (
        <div key={card.id} className="flex justify-center items-center">
          <GameCard key={card.id} card={card} />
        </div>
      ))}
    </div>
  );
};

export default GameCardGrid;

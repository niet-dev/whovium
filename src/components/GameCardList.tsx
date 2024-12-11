import { fetchCardsByBoardId } from "@/lib/data";
import GameCard from "./GameCard";

const GameCardList = async ({ id }: { id: number }) => {
  const cards = await fetchCardsByBoardId(id);

  return (
    <ul className="flex gap-2 justify-center">
      {cards.map((card) => (
        <GameCard key={card.id} card={card} />
      ))}
    </ul>
  );
};

export default GameCardList;

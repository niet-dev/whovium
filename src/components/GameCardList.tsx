import { fetchCardsByBoardId } from "@/lib/data";
import GameCard from "./GameCard";

const GameCardList = async ({ id }: { id: number }) => {
  const cards = await fetchCardsByBoardId(id);

  return (
    <ul>
      {cards.map((card) => (
        <GameCard key={card.id} card={card} />
      ))}
    </ul>
  );
};

export default GameCardList;

import { fetchCardsByBoardId } from "@/lib/data";
import GameCardCarousel from "./GameCardCarousel";

const GameCardList = async ({ id }: { id: number }) => {
  const cards = await fetchCardsByBoardId(id);

  return <GameCardCarousel cards={cards} />;
};

export default GameCardList;

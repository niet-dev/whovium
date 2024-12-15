import { fetchCardsByBoardId } from "@/lib/data";
import GameCardGrid from "./GameCardGrid";
import GameCardCarousel from "./GameCardCarousel";

const GameCardList = async ({ id }: { id: number }) => {
  const cards = await fetchCardsByBoardId(id);

  return (
    <>
      <div className="xl:hidden">
        <GameCardCarousel cards={cards} />
      </div>
      <div className="invisible xl:visible">
        <GameCardGrid cards={cards} />
      </div>
    </>
  );
};

export default GameCardList;

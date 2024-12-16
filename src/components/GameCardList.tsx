import { fetchCardsByBoardId } from "@/lib/data";

import GameCardCarousel from "./GameCardCarousel";
import GameCardGrid from "./GameCardGrid";

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

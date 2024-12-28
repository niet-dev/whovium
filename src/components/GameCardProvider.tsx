import { fetchCardsByBoardId } from "@/lib/data";

import ColorWrapper from "./ColorWrapper";

const GameCardProvider = async ({ id }: { id: number }) => {
  const cards = await fetchCardsByBoardId(id);

  return <ColorWrapper cards={cards} />;
};

export default GameCardProvider;

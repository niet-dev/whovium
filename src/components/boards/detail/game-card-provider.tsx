import { fetchCardsByBoardId } from "@/lib/data";
import ColorWrapper from "@/components/boards/detail/color-wrapper";

export default async function GameCardProvider({ id }: { id: number }) {
  const cards = await fetchCardsByBoardId(id);

  return <ColorWrapper cards={cards} />;
}

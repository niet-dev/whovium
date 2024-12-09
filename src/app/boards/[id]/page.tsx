import GameCardList from "@/components/GameCardList";
import { fetchBoardById } from "@/lib/data";

const BoardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number((await params).id);
  const board = await fetchBoardById(id);

  return (
    <main>
      <h1>{board.title}</h1>
      <GameCardList id={id} />
    </main>
  );
};

export default BoardPage;

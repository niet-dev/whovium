import BoardDetails from "@/components/boards/detail/board-details";
import GameCardProvider from "@/components/boards/detail/game-card-provider";

const BoardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number((await params).id);

  return (
    <main className="container mx-auto">
      <BoardDetails id={id} />
      <GameCardProvider id={id} />
    </main>
  );
};

export default BoardPage;

import BoardDetails from "@/components/BoardDetails";
import GameCardList from "@/components/GameCardList";

const BoardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number((await params).id);

  return (
    <main>
      <BoardDetails id={id} />
      <GameCardList id={id} />
    </main>
  );
};

export default BoardPage;

import BoardDetails from "@/components/BoardDetails";
import GameCardProvider from "@/components/GameCardProvider";

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

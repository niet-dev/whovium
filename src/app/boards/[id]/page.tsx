import { fetchCardsByBoardId } from "@/lib/data";

const BoardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number((await params).id);
  const cards = await fetchCardsByBoardId(id);

  return (
    <main>
      <h1>Page {id}</h1>
      {cards.map((card) => (
        <p key={card.id}>{card.name}</p>
      ))}
    </main>
  );
};

export default BoardPage;

import { fetchBoardById } from "@/lib/data";
import BoardCards from "@/components/boards/cards/board-cards";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  const board = await fetchBoardById(id);
  if (board === null) {
    return <p>null</p>;
  }
  return <BoardCards board={board} />;
}

import { fetchBoardById } from "@/lib/data";
import BoardDetails from "@/components/boards/detail/board-details";

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

  return <BoardDetails board={board} />;
}

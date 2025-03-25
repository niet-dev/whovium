import { fetchBoardList } from "@/lib/data";
import BoardSummary from "@/components/boards/list/board-summary";

export default async function BoardList({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const boards = await fetchBoardList(query, page);

  if (!boards || boards.length === 0) {
    return (
      <p aria-label="Empty board list" className="text-center">
        No data available.
      </p>
    );
  }

  return (
    <ul className="flex flex-col items-center gap-8">
      {boards.map((board) => (
        <li key={board.id}>
          <BoardSummary board={board} />
        </li>
      ))}
    </ul>
  );
}

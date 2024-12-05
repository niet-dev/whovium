import { fetchBoardList } from "@/lib/data";
import BoardSummary from "./BoardSummary";

const BoardList = async ({ query, page }: { query: string; page: number }) => {
  const boards = await fetchBoardList(query, page);

  if (!boards || boards.length === 0) {
    return (
      <p aria-label="Empty board list" className="text-center my-16">
        No data available.
      </p>
    );
  }

  return (
    <ul className="space-y-16 my-16">
      {boards.map((board) => (
        <li key={board.id}>
          <BoardSummary board={board} />
        </li>
      ))}
    </ul>
  );
};

export default BoardList;

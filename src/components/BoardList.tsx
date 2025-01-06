import { fetchBoardList } from "@/lib/data";

import BoardSummary from "./BoardSummary";

const BoardList = async ({ query, page }: { query: string; page: number }) => {
  const boards = await fetchBoardList(query, page);

  if (!boards || boards.length === 0) {
    return (
      <p aria-label="Empty board list" className="my-16 text-center">
        No data available.
      </p>
    );
  }

  return (
    <ul className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
      {boards.map((board) => (
        <li key={board.id}>
          <BoardSummary board={board} />
        </li>
      ))}
    </ul>
  );
};

export default BoardList;

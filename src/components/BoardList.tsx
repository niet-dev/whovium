import { fetchBoardList } from "@/lib/data";
import BoardSummary from "./BoardSummary";

const BoardList = async ({ query }: { query: string }) => {
  const boards = await fetchBoardList(query);

  if (!boards || boards.length === 0) {
    return <p aria-label="Empty board list">No data available.</p>;
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

import BoardSummary from "./BoardSummary";

const BoardList = ({ boards }: { boards: Board[] }) => {
  if (!boards || boards.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <ul>
      {boards.map((board) => (
        <li key={board.id}>
          <BoardSummary board={board} />
        </li>
      ))}
    </ul>
  );
};

export default BoardList;

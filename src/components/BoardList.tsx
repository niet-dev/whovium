import BoardSummary from "./BoardSummary";

const BoardList = ({ boards }: { boards: Board[] }) => {
  return (
    <ul>
      {boards.map((board) => (
        <li key={board.id}>
          <BoardSummary board={board} />
        </li>
      ))}
      ;
    </ul>
  );
};

export default BoardList;

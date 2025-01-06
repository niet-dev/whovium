import BoardSummarySkeleton from "./BoardSummarySkeleton";

const BoardListSkeleton = () => {
  return (
    <ul className="my-16 space-y-16">
      {Array(3)
        .fill(null)
        .map((el, i) => {
          return (
            <li key={`BoardSummarySkeleton${i}`}>
              <BoardSummarySkeleton />
            </li>
          );
        })}
    </ul>
  );
};

export default BoardListSkeleton;

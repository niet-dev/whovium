import BoardSummarySkeleton from "@/components/boards/list/board-summary-skeleton";

export default function BoardListSkeleton() {
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
}

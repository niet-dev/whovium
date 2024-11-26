import BoardList from "@/components/BoardList";
import { fetchBoardList } from "@/lib/actions";

const BoardListPage = async () => {
  const boards = await fetchBoardList();

  return (
    <div>
      <h1>Boards</h1>
      <BoardList boards={boards} />
    </div>
  );
};

export default BoardListPage;

import BoardList from "@/components/BoardList";
import { fetchBoardList } from "@/lib/actions";

const BoardListPage = async () => {
  const boards = await fetchBoardList();

  return (
    <div>
      <h1 className="text-2xl font-bold mt-16 text-center lg:text-left lg:px-[25%] lg:mx-auto">
        Boards
      </h1>
      <BoardList boards={boards} />
    </div>
  );
};

export default BoardListPage;

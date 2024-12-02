import BoardList from "@/components/BoardList";
import Search from "@/components/Search";
import { fetchBoardList } from "@/lib/actions";

type BoardListPageProps = {
  searchParams?: Promise<{
    query?: string;
  }>;
};

const BoardListPage = async ({ searchParams }: BoardListPageProps) => {
  const query = (await searchParams)?.query || "";
  const boards = await fetchBoardList(query);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-16 text-center lg:text-left">
        Boards
      </h1>
      <div className="flex justify-center">
        <div className="w-6/12">
          <Search placeholder="Search..." />
        </div>
      </div>
      <BoardList boards={boards} />
    </div>
  );
};

export default BoardListPage;

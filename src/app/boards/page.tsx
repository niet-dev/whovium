import BoardList from "@/components/BoardList";
import BoardListSkeleton from "@/components/BoardListSkeleton";
import Search from "@/components/Search";
import { Suspense } from "react";

type BoardListPageProps = {
  searchParams?: Promise<{
    query?: string;
  }>;
};

const BoardListPage = async ({ searchParams }: BoardListPageProps) => {
  const query = (await searchParams)?.query || "";

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
      <Suspense fallback={<BoardListSkeleton />}>
        <BoardList query={query} />
      </Suspense>
    </div>
  );
};

export default BoardListPage;

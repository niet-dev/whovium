import BoardList from "@/components/BoardList";
import BoardListSkeleton from "@/components/BoardListSkeleton";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { fetchBoardPages } from "@/lib/data";
import { Suspense } from "react";

type BoardListPageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

const BoardListPage = async ({ searchParams }: BoardListPageProps) => {
  const query = (await searchParams)?.query || "";
  const page = (await searchParams)?.page || 1;
  const pageCount = await fetchBoardPages(query);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-16 text-center lg:text-left">
        Boards
      </h1>
      <div className="flex justify-center mb-16">
        <div className="w-6/12">
          <Search placeholder="Search..." />
        </div>
      </div>
      <Pagination pageCount={pageCount} />
      <Suspense fallback={<BoardListSkeleton />}>
        <BoardList query={query} page={page} />
      </Suspense>
      <Pagination pageCount={pageCount} />
    </div>
  );
};

export default BoardListPage;

import { Suspense } from "react";

import { fetchBoardPages } from "@/lib/data";
import BoardList from "@/components/BoardList";
import BoardListSkeleton from "@/components/BoardListSkeleton";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";

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
      <h1 className="my-8 text-center text-xl font-bold lg:w-10/12 lg:px-4 lg:text-left 2xl:text-2xl">
        Boards
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <Search placeholder="Search..." />
        <Pagination pageCount={pageCount} />
      </div>
      <Suspense fallback={<BoardListSkeleton />}>
        <BoardList query={query} page={page} />
      </Suspense>
      <div className="my-8">
        <Pagination pageCount={pageCount} />
      </div>
    </div>
  );
};

export default BoardListPage;

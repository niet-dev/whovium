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
      <h1 className="text-xl font-bold my-8 text-center lg:w-10/12 lg:text-left lg:px-4 2xl:text-2xl">
        Boards
      </h1>
      <div className="flex flex-col gap-4 items-center md:flex-row md:justify-center">
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

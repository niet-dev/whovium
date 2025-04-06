import { Suspense } from "react";

import { fetchBoardPages } from "@/lib/data";
import BoardList from "@/components/boards/list/board-list";
import BoardListSkeleton from "@/components/boards/list/board-list-skeleton";
import BoardPagination from "@/components/boards/list/board-pagination";
import SearchBar from "@/components/boards/list/search";

type BoardListPageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function Page({ searchParams }: BoardListPageProps) {
  const query = (await searchParams)?.query || "";
  const page = Number((await searchParams)?.page) || 1;
  const pageCount = await fetchBoardPages(query);

  return (
    <main className="relative">
      <div className="bg-fill/90 flex items-center justify-center p-4">
        <div className="container mx-auto">
          <SearchBar placeholder="Search..." />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="px-4">
          <h1 className="text-background my-4 text-lg font-bold">Boards</h1>
          <Suspense fallback={<BoardListSkeleton />}>
            <BoardList query={query} page={page} />
          </Suspense>
        </div>

        <div className="py-8">
          <BoardPagination pageCount={pageCount} />
        </div>
      </div>
    </main>
  );
}

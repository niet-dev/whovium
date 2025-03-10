import { Suspense } from "react";
import Link from "next/link";

import { fetchBoardPages } from "@/lib/data";
import { getCurrentSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
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
  const { user } = await getCurrentSession();
  const query = (await searchParams)?.query || "";
  const page = (await searchParams)?.page || 1;
  const pageCount = await fetchBoardPages(query);

  return (
    <div className="container mx-auto">
      <h1 className="my-8 text-center text-xl font-bold lg:w-10/12 lg:px-4 lg:text-left 2xl:text-2xl">
        Boards
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <SearchBar placeholder="Search..." />
        {user && (
          <Button
            variant="secondary"
            asChild
            aria-label="Create"
            type="button"
            className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
          >
            <Link href="/boards/create">Create</Link>
          </Button>
        )}
      </div>
      <Suspense fallback={<BoardListSkeleton />}>
        <BoardList query={query} page={page} />
      </Suspense>
      <div className="my-8">
        <BoardPagination pageCount={pageCount} />
      </div>
    </div>
  );
}

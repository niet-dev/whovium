"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BoardPagination({ pageCount }: { pageCount: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const hasPreviousPage = page > 1;
  const hasNextPage = page < pageCount;

  return (
    <Pagination>
      <PaginationContent className="text-background">
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(page - 1)}
            aria-disabled={!hasPreviousPage}
            tabIndex={hasPreviousPage ? undefined : -1}
            className={
              hasPreviousPage ? undefined : "text-fill/70 pointer-events-none"
            }
          />
        </PaginationItem>

        {page - 2 >= 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {hasPreviousPage && (
          <PaginationItem>
            <PaginationLink href={createPageURL(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            isActive
            className="bg-fill text-text-strong pointer-events-none border-none"
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < pageCount && (
          <PaginationItem>
            <PaginationLink href={createPageURL(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page + 2 <= pageCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(page + 1)}
            aria-disabled={!hasNextPage}
            tabIndex={hasNextPage ? undefined : -1}
            className={
              hasNextPage ? undefined : "text-fill/70 pointer-events-none"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

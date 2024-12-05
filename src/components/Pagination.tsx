"use client";

import { usePathname, useSearchParams } from "next/navigation";
import PaginationLink from "./PaginationLink";

const Pagination = ({ pageCount }: { pageCount: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <section aria-label="Pagination" className="mb-16">
      <div className="flex justify-center items-center gap-4">
        <PaginationLink
          href={createPageURL(page - 1)}
          disabled={page - 1 <= 0}
          direction="left"
        />
        <p>{page}</p>
        <PaginationLink
          href={createPageURL(page + 1)}
          disabled={page + 1 > pageCount}
          direction="right"
        />
      </div>
    </section>
  );
};

export default Pagination;

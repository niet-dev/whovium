"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div role="search">
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <MagnifyingGlassIcon />
    </div>
  );
};

export default Search;

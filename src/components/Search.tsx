"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete("page");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const inputClsx = clsx(
    "peer w-full rounded-md py-[9px] pl-10 text-sm placeholder:text-gray-500",
    "focus:outline focus:outline-pink-500",
    "border border-gray-200 hover:border-gray-300",
  );

  const iconClsx = clsx(
    "absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2",
    "text-gray-500 peer-focus:text-gray-900",
  );

  return (
    <div
      role="search"
      className="relative w-full max-w-[280px] md:w-8/12 md:max-w-none"
    >
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        className={inputClsx}
      />
      <MagnifyingGlassIcon className={iconClsx} />
    </div>
  );
};

export default Search;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function SearchBar({ placeholder }: { placeholder: string }) {
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

  const inputCn = cn(
    "peer bg-background border-stroke-weak w-full max-w-md pl-10",
  );

  const iconCn = cn(
    "absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2",
    "text-stroke-weak peer-focus:text-text-strong",
  );

  return (
    <div className="flex justify-center">
      <div role="search" className="relative w-full max-w-md">
        <Input
          type="search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          className={inputCn}
        />
        <Search className={iconCn} />
      </div>
    </div>
  );
}

import Link from "next/link";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import { cn } from "@/lib/utils";

type PaginationLinkProps = {
  href: string;
  disabled: boolean;
  direction: "left" | "right";
};

export default function PaginationLink({
  href,
  disabled,
  direction,
}: PaginationLinkProps) {
  const arrowIcon =
    direction === "left" ? (
      <ArrowLeftIcon aria-label="Left arrow icon" className="w-4" />
    ) : (
      <ArrowRightIcon aria-label="Right arrow icon" className="w-4" />
    );

  const className = cn(
    "rounded-md border p-2",
    disabled ? "bg-gray-100 text-gray-400" : "hover:border-gray-300",
  );

  return disabled ? (
    <div aria-label={`disabled ${direction} page link`} className={className}>
      {arrowIcon}
    </div>
  ) : (
    <Link href={href} aria-label={`${direction} page link`}>
      <div className={className}>{arrowIcon}</div>
    </Link>
  );
}

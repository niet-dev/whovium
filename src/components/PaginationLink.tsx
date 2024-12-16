import Link from "next/link";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface PaginationLinkProps {
  href: string;
  disabled: boolean;
  direction: "left" | "right";
}

const PaginationLink = ({ href, disabled, direction }: PaginationLinkProps) => {
  const arrowIcon =
    direction === "left" ? (
      <ArrowLeftIcon aria-label="Left arrow icon" className="w-4" />
    ) : (
      <ArrowRightIcon aria-label="Right arrow icon" className="w-4" />
    );

  const className = clsx(
    "border rounded-md p-2",
    disabled && "bg-gray-100 text-gray-400",
    !disabled && "hover:border-gray-300",
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
};

export default PaginationLink;

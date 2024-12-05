import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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

  return disabled ? (
    <div
      aria-label={`disabled ${direction} page link`}
      className="border rounded-md p-2"
    >
      {arrowIcon}
    </div>
  ) : (
    <Link href={href} aria-label={`${direction} page link`}>
      <div className="border rounded-md p-2">{arrowIcon}</div>
    </Link>
  );
};

export default PaginationLink;

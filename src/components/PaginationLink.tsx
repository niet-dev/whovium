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
      <ArrowLeftIcon aria-label="Left arrow icon" />
    ) : (
      <ArrowRightIcon aria-label="Right arrow icon" />
    );

  return disabled ? (
    <div aria-label={`Disabled ${direction} page link`}>{arrowIcon}</div>
  ) : (
    <Link href={href} aria-label={`${direction} page link`}>
      {arrowIcon}
    </Link>
  );
};

export default PaginationLink;

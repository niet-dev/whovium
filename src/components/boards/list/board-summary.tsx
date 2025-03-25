import Image from "next/image";
import Link from "next/link";

import { BoardWithUser } from "@/lib/types";

export default function BoardSummary({ board }: { board: BoardWithUser }) {
  return (
    <article className="relative w-[288px] rounded-md shadow-md">
      <section
        aria-label="Image container"
        className="relative h-[288px] w-full"
      >
        <Image
          src={board.imgSrc}
          alt={`Image for ${board.title}`}
          className="rounded-t-md"
          fill
          priority
        />
      </section>
      <section
        aria-label="Board details"
        className="flex flex-col justify-between gap-4 p-4"
      >
        <hgroup role="group" className="">
          <h3 className="font-bold">
            <Link href={`boards/${board.id}`} className="text-red-400">
              <span className="absolute inset-0"></span>
              {board.title}
            </Link>
          </h3>
          <p aria-label="Created by" className="text-sm text-gray-600">
            by {board.createdBy.username}
          </p>
        </hgroup>
      </section>
    </article>
  );
}

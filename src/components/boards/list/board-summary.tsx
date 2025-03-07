import Image from "next/image";
import Link from "next/link";

import { Board } from "@/lib/types";

const BoardSummary = ({ board }: { board: Board }) => {
  return (
    <article className="mx-auto w-[300px] rounded-lg border shadow-xl xl:flex xl:h-[300px] xl:w-full">
      <section
        aria-label="Image container"
        className="relative h-[300px] w-[300px] md:flex-none"
      >
        <Image
          src={board.imgSrc}
          alt={`Image for ${board.title}`}
          className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          fill
          priority
        />
      </section>
      <section
        aria-label="Board details"
        className="flex h-[300px] flex-col justify-between p-6"
      >
        <hgroup role="group" className="">
          <h2 className="text-lg font-bold 2xl:text-xl">
            <Link
              href={`boards/${board.id}`}
              className="text-pink-600 hover:text-pink-700"
            >
              {board.title}
            </Link>
          </h2>
          <p
            aria-label="Created by"
            className="text-sm text-gray-600 2xl:text-base"
          >
            by{" "}
            <Link
              href={`users/${board.createdBy.username}`}
              className="underline decoration-pink-300 decoration-2 hover:decoration-pink-400"
            >
              {board.createdBy.username}
            </Link>
          </p>
        </hgroup>
        <div className="">
          <p
            aria-label="Board description"
            className="line-clamp-6 text-sm xl:line-clamp-5 2xl:text-base"
          >
            {board.description}
          </p>
        </div>

        <section aria-label="Button container" className="flex justify-center">
          <Link
            href={`boards/${board.id}`}
            className="w-full rounded-full bg-sky-500 px-4 py-2 text-center text-lg font-bold text-sky-100 shadow-md hover:opacity-90 2xl:text-xl"
          >
            Play
          </Link>
        </section>
      </section>
    </article>
  );
};

export default BoardSummary;

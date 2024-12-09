import Image from "next/image";
import Link from "next/link";

import { Board } from "@/lib/types";

const BoardSummary = ({ board }: { board: Board }) => {
  return (
    <article className="w-[300px] mx-auto border rounded-lg shadow-xl xl:w-full xl:h-[300px] xl:flex">
      <section
        aria-label="Image container"
        className="relative h-[300px] w-[300px] md:flex-none"
      >
        <Image
          src={board.imgSrc}
          alt={`Image for ${board.title}`}
          className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
          fill
          priority
        />
      </section>
      <section
        aria-label="Board details"
        className="p-6 h-[300px] flex flex-col justify-between"
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
            className="text-gray-600 text-sm 2xl:text-base"
          >
            by{" "}
            <Link
              href={`users/${board.createdBy.username}`}
              className="underline decoration-2 decoration-pink-300 hover:decoration-pink-400"
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
            className="w-full py-2 px-4 bg-sky-500 text-sky-100 text-center text-lg font-bold rounded-full shadow-md hover:opacity-90 2xl:text-xl"
          >
            Play
          </Link>
        </section>
      </section>
    </article>
  );
};

export default BoardSummary;

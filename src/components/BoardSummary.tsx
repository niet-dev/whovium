import Image from "next/image";
import Link from "next/link";

import { Board } from "@/lib/types";

const BoardSummary = ({ board }: { board: Board }) => {
  return (
    <article className="w-[300px] mx-auto border rounded-lg shadow-2xl md:w-9/12 md:h-[300px] md:flex md:max-w-4xl">
      <section
        aria-label="Image container"
        className="relative h-[300px] w-[300px] md:flex-none"
      >
        <Image
          src={board.imgSrc}
          alt={`Image for ${board.title}`}
          className="rounded-t-lg md:rounded-t-none md:rounded-l-lg"
          fill
          priority
        />
      </section>
      <section
        aria-label="Board details"
        className="p-6 md:px-8 flex flex-col justify-around gap-4 w-full"
      >
        <hgroup role="group" className="">
          <h2 className="text-xl font-bold md:text-2xl">
            <Link
              href={`boards/${board.id}`}
              className="text-pink-600 hover:text-pink-700"
            >
              {board.title}
            </Link>
          </h2>
          <p aria-label="Created by" className="text-gray-600">
            by{" "}
            <Link
              href={`users/${board.createdBy.username}`}
              className="underline decoration-2 decoration-pink-300 hover:decoration-pink-400"
            >
              {board.createdBy.username}
            </Link>
          </p>
        </hgroup>
        <p aria-label="Board description" className="lg:text-lg">
          {board.description}
        </p>
        <section
          aria-label="Button container"
          className="flex justify-center md:justify-end"
        >
          <Link
            href={`boards/${board.id}`}
            className="w-full md:w-32 py-2 px-4 bg-sky-500 text-white text-center text-md font-bold rounded-full shadow-md hover:opacity-90"
          >
            Play
          </Link>
        </section>
      </section>
    </article>
  );
};

export default BoardSummary;

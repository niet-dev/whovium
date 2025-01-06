import Link from "next/link";

import { fetchBoardById } from "@/lib/data";

const BoardDetails = async ({ id }: { id: number }) => {
  const board = await fetchBoardById(id);

  if (!board) {
    return <p>No data available.</p>;
  }

  return (
    <div className="mx-8 mt-8 rounded-lg">
      <section aria-label="Board details" className="flex flex-col">
        <hgroup role="group" className="mb-4">
          <h2 className="text-lg font-bold lg:text-xl">{board.title}</h2>
          <p
            aria-label="Created by"
            className="text-sm text-gray-600 lg:text-base"
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
        <div>
          <p aria-label="Board description" className="text-sm lg:text-base">
            {board.description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default BoardDetails;

import Image from "next/image";

import { fetchBoardById } from "@/lib/data";

const BoardDetails = async ({ id }: { id: number }) => {
  const board = await fetchBoardById(id);

  if (!board) {
    return <p>No data available.</p>;
  }

  return (
    <section aria-label="Board details">
      <Image
        height={300}
        width={300}
        src={board.imgSrc}
        alt={`Image for ${board.title}`}
        priority
      />
      <h2>{board.title}</h2>
      <p>by {board.createdBy.username}</p>
      <p>{board.description}</p>
    </section>
  );
};

export default BoardDetails;

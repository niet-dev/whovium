import Image from "next/image";
import Link from "next/link";

import { Board } from "@/lib/types";

const BoardSummary = ({ board }: { board: Board }) => {
  return (
    <article>
      <section aria-label="Image container" className="relative h-[300px]">
        <Image
          src={board.imgSrc}
          alt={`Image for ${board.title}`}
          fill
          priority
        />
      </section>
      <hgroup role="group">
        <h2>
          <Link href={board.id}>{board.title}</Link>
        </h2>
        <p aria-label="Created by">
          by <Link href={`users/${board.createdBy}`}>{board.createdBy}</Link>
        </p>
      </hgroup>
      <p aria-label="Board description">{board.description}</p>
    </article>
  );
};

export default BoardSummary;

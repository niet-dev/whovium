import { Board } from "@/lib/types";
import Link from "next/link";

const BoardSummary = ({ board }: { board: Board }) => {
  return (
    <article>
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

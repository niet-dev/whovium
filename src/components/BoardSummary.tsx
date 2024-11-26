import { Board } from "@/lib/types";

const BoardSummary = ({ board }: { board: Board }) => {
  return (
    <article>
      <hgroup role="group">
        <h2>{board.title}</h2>
        <p>by {board.createdBy}</p>
      </hgroup>
      <p aria-label="Board description">{board.description}</p>
    </article>
  );
};

export default BoardSummary;

import Image from "next/image";

import { fetchCardsByBoardId } from "@/lib/data";

const GameCardList = async ({ id }: { id: number }) => {
  const cards = await fetchCardsByBoardId(id);

  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>
          <Image
            src={card.imgSrc}
            alt={`Image for ${card.name}`}
            width={100}
            height={100}
          />
          <h2>{card.name}</h2>
        </li>
      ))}
    </ul>
  );
};

export default GameCardList;

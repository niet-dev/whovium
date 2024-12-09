"use client";

import Image from "next/image";
import { Card } from "@prisma/client";

const GameCard = ({ card }: { card: Card }) => {
  return (
    <li>
      <Image
        src={card.imgSrc}
        alt={`Image for ${card.name}`}
        width={100}
        height={100}
      />
      <h2>{card.name}</h2>
    </li>
  );
};

export default GameCard;

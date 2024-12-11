"use client";

import Image from "next/image";
import { Card } from "@prisma/client";

const GameCard = ({ card }: { card: Card }) => {
  return (
    <li>
      <div className="h-[350px] w-[250px] relative rounded-lg shadow-inner">
        <Image
          src="https://placehold.co/250x350"
          alt={`Image for ${card.name}`}
          fill
          className="-z-50 rounded-lg"
        />
      </div>
      <div className="w-[250px] text-center">
        <h2 className="">{card.name}</h2>
      </div>
    </li>
  );
};

export default GameCard;

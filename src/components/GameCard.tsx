"use client";

import Image from "next/image";
import type { Card as GameCardType } from "@prisma/client";

const GameCard = ({ card }: { card: GameCardType }) => {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="relative h-[350px] w-[250px] rounded-lg shadow-inner">
        <Image
          src="https://placehold.co/250x350"
          alt={`Image for ${card.name}`}
          fill
          className="-z-10 rounded-lg"
        />
      </div>
      <div className="text-center">
        <h2 className="">{card.name}</h2>
      </div>
    </div>
  );
};

export default GameCard;

"use client";

import { useState } from "react";
import Image from "next/image";

import type { Card as GameCardType } from "@prisma/client";
import { motion, useAnimate } from "motion/react";

import { cn } from "@/lib/utils";

export type GameCardProps = {
  card: GameCardType;
  color: "red" | "blue";
};

const GameCard = ({ card, color }: GameCardProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [scope, animate] = useAnimate();

  const handleClick = () => {
    if (!isSelected) {
      animate(scope.current, { opacity: 0.7 }, { duration: 0.3 });
    } else {
      animate(scope.current, { opacity: 0 }, { duration: 0.3 });
    }

    setIsSelected(!isSelected);
  };

  return (
    <div
      aria-label={card.name}
      data-testid="Game card"
      className="flex flex-col justify-center gap-2"
    >
      <motion.div
        onClick={handleClick}
        className="relative h-[350px] w-[250px] rounded-lg shadow-inner"
        whileHover={{ y: -5 }}
        data-testid="motion div"
      >
        <Image
          src={card.imgSrc}
          alt={`Image for card ${card.name}`}
          fill
          className="-z-20 rounded-lg"
        />
        <div
          ref={scope}
          className={cn(
            "-z-10 h-full rounded-lg opacity-0",
            color === "red" ? "bg-red-500" : "bg-blue-500",
          )}
        />
      </motion.div>
      <div className="py-1 text-center">
        <h2
          className={cn(
            "font-bold",
            color === "red" ? "text-red-700" : "text-blue-700",
          )}
        >
          {card.name}
        </h2>
      </div>
    </div>
  );
};

export default GameCard;

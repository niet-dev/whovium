"use client";

import type { Card as GameCardType } from "@prisma/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import GameCard from "./GameCard";

const GameCardCarousel = ({ cards }: { cards: GameCardType[] }) => {
  return (
    <Carousel className="w-full container mx-auto" opts={{ dragFree: true }}>
      <CarouselContent>
        {cards.map((card) => (
          <CarouselItem key={card.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 flex items-center justify-center h-[400px]">
              <GameCard card={card} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default GameCardCarousel;

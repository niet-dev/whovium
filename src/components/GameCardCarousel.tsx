"use client";

import { useState, useEffect } from "react";
import type { Card as GameCardType } from "@prisma/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import GameCard from "./GameCard";

const GameCardCarousel = ({ cards }: { cards: GameCardType[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        className="w-full container mx-auto"
        opts={{ dragFree: true, loop: true }}
      >
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
      <div className="py-1 text-center text-sm text-muted-foreground">
        {current} of {count}
      </div>
    </>
  );
};

export default GameCardCarousel;

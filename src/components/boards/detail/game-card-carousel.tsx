"use client";

import { useEffect, useState } from "react";

import type { Card as GameCardType } from "@prisma/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import GameCard from "@/components/boards/detail/game-card";

export default function GameCardCarousel({
  cards = [],
  color,
}: {
  cards: GameCardType[];
  color: "red" | "blue";
}) {
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
    <Carousel
      setApi={setApi}
      className="container my-8 w-full rounded-lg border px-2 py-8 shadow-lg"
      opts={{ dragFree: true, loop: true }}
    >
      <CarouselContent>
        {cards.map((card) => (
          <CarouselItem key={card.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="flex h-[400px] items-center justify-center p-1">
              <GameCard card={card} color={color} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="text-muted-foreground mt-2 text-center text-sm">
        {current} of {count}
      </div>
    </Carousel>
  );
}

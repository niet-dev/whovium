"use client";

import { useState } from "react";
import Image from "next/image";

import { Card } from "@prisma/client";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

type CardStackProps = {
  cards: Card[];
  cardStates: Record<number, boolean>;
  handleCardStateChange: (id: number) => void;
  startingIndex: number;
};

export default function CardStack({
  cards,
  cardStates,
  handleCardStateChange,
  startingIndex,
}: CardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      grabCursor={true}
      effect={"cards"}
      modules={[EffectCards]}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      initialSlide={startingIndex}
      className="aspect-[calc(2.5/3.5)] w-48"
    >
      {cards.map((card) => (
        <SwiperSlide
          key={card.id}
          className="rounded-md shadow-md"
          onClick={() => handleCardStateChange(card.id)}
        >
          <div className="relative h-full inset-ring-8 inset-ring-white">
            <div
              className={`${cardStates[card.id] ? "opacity-70" : "opacity-0"} bg-stroke-strong h-full`}
            ></div>
            <Image src={card.imgSrc} alt={card.name} fill className="-z-10" />
          </div>
        </SwiperSlide>
      ))}
      <span slot="container-end">
        <div className="text-text-strong p-4 text-center text-sm font-bold">
          <p>{cards.at(activeIndex)?.name}</p>
        </div>
      </span>
    </Swiper>
  );
}

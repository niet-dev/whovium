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
};

export default function CardStack({ cards }: CardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Swiper
      grabCursor={true}
      effect={"cards"}
      modules={[EffectCards]}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      className="aspect-[calc(2.5/3.5)] w-48"
    >
      {cards.map((card) => (
        <SwiperSlide key={card.id} className="rounded-md shadow-md">
          <div className="relative h-full inset-ring-8 inset-ring-white">
            <Image src={card.imgSrc} alt={card.name} fill className="-z-10" />
          </div>
        </SwiperSlide>
      ))}
      <span slot="container-end">
        <div className="p-4 text-center">{cards.at(activeIndex).name}</div>
      </span>
    </Swiper>
  );
}

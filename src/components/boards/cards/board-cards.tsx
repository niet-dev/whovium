"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ChevronLeft } from "lucide-react";

import { BoardWithUserAndCards } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CardStack from "./card-stack";

type BoardCardsProps = {
  board: BoardWithUserAndCards;
};

export default function BoardCards({ board }: BoardCardsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main>
      <div className="relative flex w-full items-center justify-center bg-gray-200 p-4">
        <div className="absolute left-0 pl-4">
          <Link href={`/boards/${board.id}`}>
            <ChevronLeft size="20" />
          </Link>
        </div>
        <h3>{board.title}</h3>
      </div>
      <div className="container mx-auto">
        <section aria-label="Cards" className="flex justify-center py-8">
          <div className="grid grid-cols-3 gap-4">
            {board.cards.map((card) => (
              <div key={card.id} onClick={setDialogOpen}>
                <div className="rounded-md shadow-md inset-ring-4 inset-ring-white">
                  <div className="relative aspect-[calc(2.5/3.5)] h-28 rounded-md">
                    <Image
                      src={card.imgSrc}
                      alt={card.name}
                      fill
                      className="-z-20 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">Cards</DialogTitle>
            <DialogDescription className="sr-only">
              A close-up of this board&apos;s cards.
            </DialogDescription>
          </DialogHeader>
          <div>
            <CardStack cards={board.cards} />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

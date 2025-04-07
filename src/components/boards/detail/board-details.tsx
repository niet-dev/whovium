"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, Images, User } from "lucide-react";

import { BoardWithUserAndCards } from "@/lib/types";
import { Button } from "@/components/ui/button";

type BoardDetailsProps = {
  board: BoardWithUserAndCards;
};

export default function BoardDetails({ board }: BoardDetailsProps) {
  if (!board) {
    return <p>No data available.</p>;
  }

  return (
    <main className="relative">
      <div className="bg-fill/90 text-text-strong p-4">
        <div className="container mx-auto">
          <div className="relative flex w-full items-center justify-center">
            <div className="absolute left-0 pl-4">
              <Link href="/boards">
                <ChevronLeft size="20" className="text-text-weak" />
              </Link>
            </div>
            <h1>Details</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-md px-4 py-8">
        <div className="bg-fill rounded-md">
          <section
            aria-label="Board details"
            className="flex flex-col gap-4 p-4"
          >
            <h2 className="text-text-strong mx-auto w-full text-lg font-bold">
              {board.title}
            </h2>
            <div className="flex justify-center">
              <div className="relative size-64">
                <Image
                  src={board.imgSrc}
                  alt={board.title}
                  fill
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="mx-auto w-full">
              <div className="text-text-weak flex justify-around text-sm">
                <div className="flex items-center gap-1">
                  <User size="18" />
                  <p>{board.createdBy.username}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Images size="18" />
                  <p>{board.cards.length} Cards</p>
                </div>
              </div>
            </div>

            <div>
              <p
                aria-label="Board description"
                className="text-text-weak mx-auto w-full text-sm"
              >
                {board.description}
              </p>
            </div>
            <Button
              asChild
              className="bg-brand text-background hover:bg-brand/90 mx-auto w-full"
            >
              <Link href={`/boards/${board.id}/play`}>Play</Link>
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}

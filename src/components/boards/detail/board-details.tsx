"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, Images, User } from "lucide-react";

import { BoardWithUser } from "@/lib/types";
import { Button } from "@/components/ui/button";

type BoardDetailsProps = {
  board: BoardWithUser;
};

export default function BoardDetails({ board }: BoardDetailsProps) {
  if (!board) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <div className="relative flex w-full items-center justify-center bg-gray-200 p-4">
        <div className="absolute left-0 pl-4">
          <Link href="/boards">
            <ChevronLeft size="20" />
          </Link>
        </div>
        <h3>Details</h3>
      </div>
      <section aria-label="Board details" className="flex flex-col gap-4 p-4">
        <h2 className="mx-auto w-[288px] text-xl font-bold text-red-400">
          {board.title}
        </h2>
        <div className="flex justify-center">
          <div className="relative h-[288px] w-[288px]">
            <Image src={board.imgSrc} alt={board.title} fill />
          </div>
        </div>
        <div className="mx-auto w-[288px]">
          <div className="flex justify-around text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User size="18" />
              <Link
                href={`/users/${board.userId}`}
                className="underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600"
              >
                {board.createdBy.username}
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Images size="18" />
              <p>62 Cards</p>
            </div>
          </div>
        </div>

        <div>
          <p aria-label="Board description" className="mx-auto w-[288px]">
            {board.description}
          </p>
        </div>
        <Button asChild className="mx-auto w-[288px]">
          <Link href={`/boards/${board.id}/play`}>Play</Link>
        </Button>
      </section>
    </div>
  );
}

"use server";

import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import type { Session } from "@prisma/client";

import { uploadBoardImages } from "@/lib/aws";
import prisma from "@/lib/prisma";
import { BoardData } from "@/lib/types";

const ITEMS_PER_PAGE = 10;
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export async function fetchBoardList(query: string, page: number) {
  const res = await prisma.board.findMany({
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      createdBy: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return res;
}

export async function fetchBoardPages(query: string) {
  const res = await prisma.board.count({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  const pageCount = Math.ceil(res / ITEMS_PER_PAGE);

  return pageCount;
}

export async function fetchCardsByBoardId(id: number) {
  const res = await prisma.card.findMany({
    where: {
      boardId: id,
    },
  });

  return res;
}

export async function fetchBoardById(id: number) {
  const res = await prisma.board.findUnique({
    where: {
      id: id,
    },
    include: {
      createdBy: true,
    },
  });

  return res;
}

export async function createSession(
  token: string,
  userId: number,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + ONE_DAY_MS * 30),
  };
  await prisma.session.create({
    data: session,
  });

  return session;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - ONE_DAY_MS * 15) {
    session.expiresAt = new Date(Date.now() + ONE_DAY_MS * 30);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

export async function createBoard(data: BoardData, userId: number) {
  const boardImages = await uploadBoardImages(data.cover, data.images);

  const board = await prisma.board.create({
    data: {
      title: data.title,
      imgSrc: boardImages.cover,
      s3Path: boardImages.path,
      description: data.description,
      userId,
    },
  });

  for (const image of boardImages.images) {
    await prisma.card.create({
      data: {
        name: image.name,
        imgSrc: image.path,
        boardId: board.id,
      },
    });
  }

  return board.id;
}

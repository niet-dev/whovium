"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { nanoid } from "nanoid";
import sharp from "sharp";

import { s3PutObject } from "@/lib/aws";
import prisma from "@/lib/prisma";
import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/session";
import {
  ActionResult,
  BoardData,
  NamedImage,
  S3BoardImages,
} from "@/lib/types";

async function uploadBoardImages(
  cover: File,
  images: NamedImage[],
): S3BoardImages {
  const path = nanoid();
  const boardImages: S3BoardImages = { path, images: [] };

  boardImages.cover = await s3PutObject(boardImages.path, cover);

  for (const image of images) {
    const resizedImage = await resizeImage(image.file);
    const location = await s3PutObject(boardImages.path, resizedImage);
    console.log(`Location: ${location}`);
    boardImages.images.push({ name: image.name, path: location });
  }

  return boardImages;
}

async function resizeImage(image: File) {
  const imgBuffer = await image.arrayBuffer();
  const resized = await sharp(Buffer.from(imgBuffer))
    .resize(300)
    .png()
    .toBuffer();
  return new File([resized], `${nanoid()}.png`);
}

export async function createBoard(data: BoardData, userId: number) {
  const boardImages = await uploadBoardImages(data.cover, data.images);
  console.log(boardImages);

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

export async function signout(): Promise<ActionResult> {
  const { session } = await getCurrentSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();
  revalidatePath("/login");
  redirect("/login");
}

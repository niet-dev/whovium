"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { nanoid } from "nanoid";
import sharp from "sharp";

import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/session";

import { s3PutObject } from "./aws";

type NamedImage = {
  file: File;
  name: string;
};

interface S3CardImage {
  name: string;
  path: string;
}

type BoardData = {
  title: string;
  description: string;
  cover: File;
  images: NamedImage[];
};

type ActionResult = {
  error: string | null;
};

interface S3BoardImages {
  path: string;
  cover: string;
  images: S3CardImage[];
}

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

export async function createBoard(data: BoardData) {
  const boardImages = await uploadBoardImages(data.cover, data.images);
  console.log(boardImages);
  /** const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("cover", data.cover);

  data.images.forEach((image) => {
    formData.append(`${image.name}`, image.file);
  });

  const res = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();
  return json; **/
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

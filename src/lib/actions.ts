"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import sharp from "sharp";

import { invalidateSession } from "@/lib/data";
import { deleteSessionTokenCookie, getCurrentSession } from "@/lib/session";
import { ActionResult } from "@/lib/types";

export async function resizeImage(image: File): Promise<File> {
  const imgBuffer = await image.arrayBuffer();
  const resized = await sharp(Buffer.from(imgBuffer))
    .resize(300)
    .png()
    .toBuffer();
  return new File([resized], `${nanoid()}.png`);
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

export async function uploadImage(image: File): Promise<string> {
  const blob = await put(image.name, image, {
    access: "public",
  });
  return blob.url;
}

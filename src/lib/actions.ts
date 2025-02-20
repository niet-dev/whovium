"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/session";

type NamedImage = {
  file: File;
  name: string;
};

type BoardData = {
  title: string;
  description: string;
  cover: File;
  images: NamedImage[];
};

type ActionResult = {
  error: string | null;
};

export async function createBoard(data: BoardData) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("cover", data.coverImage);

  data.cardImages.forEach((image) => {
    formData.append(`${image.name}`, image.file);
  });

  const res = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();
  return json;
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

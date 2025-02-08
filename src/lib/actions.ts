"use server";

import type { NamedImage } from "@/components/BoardForm";

type BoardData = {
  title: string;
  description: string;
  coverImage: File;
  cardImages: NamedImage[];
};

export async function createBoard(data: BoardData) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("cover-image", data.coverImage);

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

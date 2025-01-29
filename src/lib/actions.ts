"use server";

import { NamedPreviewImage, PreviewImage } from "@/components/BoardForm";

type BoardData = {
  title: string;
  description: string;
  coverImage: PreviewImage;
  cardImages: NamedPreviewImage[];
};

export async function createBoard(data: BoardData) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("cover-image", data.coverImage.file);

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

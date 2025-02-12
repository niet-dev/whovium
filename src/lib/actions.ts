"use server";

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

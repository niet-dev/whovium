"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { createBoard } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type NamedImage = {
  id: number;
  file: string;
  name: string;
};

export default function BoardForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File>(null);
  const [cardImages, setCardImages] = useState<NamedImage[]>([]);
  const idIndexRef = useRef(0);

  function handleCoverImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCoverImage(e.target.files[0]);
  }

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const images: NamedImage[] = [];
    for (let i = 0; i < e.target.files?.length; i++) {
      images.push({
        id: idIndexRef.current,
        file: e.target.files[i],
        name: "",
      });
      idIndexRef.current++;
    }
    setCardImages([...cardImages, ...images]);
  }

  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) {
    setCardImages(
      cardImages.map((image) => {
        return image.id === id ? { ...image, name: e.target.value } : image;
      }),
    );
  }

  function handleImageRemove(id: number) {
    const images: NamedImage[] = cardImages.filter((image) => image.id !== id);
    setCardImages(images);
  }

  return (
    <div className="container mx-auto max-w-lg">
      <form
        action={() =>
          createBoard({ title, description, coverImage, cardImages })
        }
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="Enter a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="cover-image">Cover Image</Label>
          <Input
            type="file"
            id="cover-image"
            accept="image/*"
            onChange={handleCoverImageChange}
          />
        </div>
        {coverImage && (
          <div className="relative h-48 w-48">
            <Image
              src={URL.createObjectURL(coverImage)}
              alt="cover image"
              fill
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Label htmlFor="card-images">Card Images</Label>
          <Input
            type="file"
            id="card-images"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
          />
        </div>
        {cardImages.map((image) => (
          <div key={image.id} className="flex space-x-4">
            <div className="relative h-48 w-48">
              <Image
                src={URL.createObjectURL(image.file)}
                alt={image.file.name}
                fill
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => handleImageRemove(image.id)}
            >
              Remove
            </Button>
            <Input
              type="text"
              onChange={(e) => handleNameChange(e, image.id)}
            />
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

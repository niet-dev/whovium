"use client";

import { useState } from "react";
import Image from "next/image";

import { createBoard } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface PreviewImage {
  file: File;
  path: string;
}

export interface NamedPreviewImage extends PreviewImage {
  name: string;
}

export default function BoardForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coverImage, setCoverImage] = useState<PreviewImage>(null);
  const [cardImages, setCardImages] = useState<NamedPreviewImage[]>([]);

  function handleCoverImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCoverImage({
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    });
  }

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const images = [];

    for (let i = 0; i < e.target.files.length; i++) {
      images.push({
        file: e.target.files[i],
        path: URL.createObjectURL(e.target.files[i]),
        name: "",
      });
    }
    setCardImages(images);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCardImages(
      cardImages.map((entry) =>
        entry.path === e.target.id ? { ...entry, name: e.target.value } : entry,
      ),
    );
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
        {coverImage ? (
          <div className="relative h-48 w-48">
            <Image src={coverImage.path} alt="cover image" fill />
          </div>
        ) : (
          <></>
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
          <div key={image.path} className="flex space-x-4">
            <div key={image.path} className="relative h-48 w-48">
              <Image src={image.path} alt="uploaded image" fill />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor={image.path}>Name</Label>
              <Input
                type="text"
                id={image.path}
                value={image.name}
                placeholder="Enter a name..."
                onChange={handleNameChange}
              />
            </div>
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

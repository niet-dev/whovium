import type { User } from "@prisma/client";

export interface Board {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  imgSrc: string;
  createdBy: User;
  description: string;
}

export interface EditorImage {
  file: File;
}

export interface EditorImageWithIndex extends EditorImage {
  index: number;
}

export type NamedImage = {
  file: File;
  name: string;
};

export interface S3CardImage {
  name: string;
  path: string;
}

export type BoardData = {
  title: string;
  description: string;
  cover: File;
  images: NamedImage[];
};

export type ActionResult = {
  error: string | null;
};

export interface S3BoardImages {
  path: string;
  cover: string;
  images: S3CardImage[];
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

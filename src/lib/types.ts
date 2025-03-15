import { Prisma, type Session, type User } from "@prisma/client";

export type BoardWithUser = Prisma.BoardGetPayload<{
  include: { createdBy: true };
}>;

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

export interface CardWithPath {
  name: string;
  path: string;
}

export type ActionResult = {
  error: string | null;
};

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

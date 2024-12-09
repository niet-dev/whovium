import { faker } from "@faker-js/faker";

import type { Board } from "@/lib/types";

export const seedBoards = (numBoards: number): Board[] => {
  faker.seed(24);
  const boardList: Board[] = [];
  for (let i = 0; i < numBoards; i++) {
    boardList.push({
      id: faker.string.uuid(),
      imgSrc: "https://placehold.co/300x300",
      title: faker.book.title(),
      createdBy: faker.book.author(),
      description: faker.lorem.sentences(2),
    });
  }
  faker.seed();
  return boardList;
};

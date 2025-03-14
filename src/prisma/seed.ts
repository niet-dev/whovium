import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fakerSeed = 24;

async function seedUsers(numUsers: number) {
  for (let i = 0; i < numUsers; i++) {
    await prisma.user.create({
      data: {
        githubId: faker.number.int(100000000),
        username: faker.internet.username(),
      },
    });
  }
}

async function seedBoards(numUsers: number, numBoards: number) {
  for (let i = 0; i < numBoards; i++) {
    await prisma.board.create({
      data: {
        title: faker.book.series(),
        imgSrc: "https://placehold.co/300x300",
        description: faker.lorem.paragraph(),
        userId: Math.floor(Math.random() * numUsers + 1),
      },
    });
  }
}

async function seedCards(numBoards: number, numCards: number) {
  for (let i = 0; i < numBoards; i++) {
    for (let j = 0; j < numCards; j++) {
      await prisma.card.create({
        data: {
          name: faker.person.fullName(),
          imgSrc: "https://placehold.co/250x350",
          boardId: i + 1,
        },
      });
    }
  }
}

async function seedDb({
  numUsers,
  numBoards,
  numCards,
}: {
  numUsers: number;
  numBoards: number;
  numCards: number;
}) {
  faker.seed(fakerSeed);
  await seedUsers(numUsers);
  await seedBoards(numUsers, numBoards);
  await seedCards(numBoards, numCards);
  faker.seed();
}

seedDb({ numUsers: 2, numBoards: 5, numCards: 10 })
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

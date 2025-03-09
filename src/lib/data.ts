import prisma from "@/lib/prisma";

const ITEMS_PER_PAGE = 10;

export async function fetchBoardList(query: string, page: number) {
  const res = await prisma.board.findMany({
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      createdBy: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return res;
}

export async function fetchBoardPages(query: string) {
  const res = await prisma.board.count({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  const pageCount = Math.ceil(res / ITEMS_PER_PAGE);

  return pageCount;
}

export async function fetchCardsByBoardId(id: number) {
  const res = await prisma.card.findMany({
    where: {
      boardId: id,
    },
  });

  return res;
}

export async function fetchBoardById(id: number) {
  const res = await prisma.board.findUnique({
    where: {
      id: id,
    },
    include: {
      createdBy: true,
    },
  });

  return res;
}

import prisma from "./prisma";

const ITEMS_PER_PAGE = 10;

export const fetchBoardList = async (query: string) => {
  const res = await prisma.board.findMany({
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
};

export const fetchBoardPages = async (query: string) => {
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
};

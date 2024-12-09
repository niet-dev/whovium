import prisma from "./prisma";

const ITEMS_PER_PAGE = 10;

export const fetchBoardList = async (query: string, page: number) => {
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

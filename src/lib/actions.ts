import prisma from "./prisma";

export const fetchBoardList = async (query: string) => {
  const res = await prisma.board.findMany({
    take: 10,
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

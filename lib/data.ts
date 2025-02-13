import prisma from "@/lib/db";

export async function fetchAnimeByQuery(query: string) {
  const res = await prisma?.anime.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
          },
        },
        {
          engName: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return res;
}

export async function fetchUniqueAnime(engName: string) {
  const res = await prisma?.anime.findMany({
    where: {
      engName: engName,
    },
  });
  return res;
}

export async function fetchUniqueYears() {
  const res = await prisma?.anime.findMany({
    select: {
      year: true,
    },
    orderBy: {
      year: "desc",
    },
  });
  const uniqueYearSet = new Set(res?.map((anime) => anime.year));
  const uniqueYearArr = [...uniqueYearSet];
  return uniqueYearArr;
}

export async function fetchAnimeByYear(year: string) {
  const res = await prisma?.anime.findMany({
    where: {
      year: year,
    },
  });
  return res;
}

export async function fetchUserAnimeHistory(userId: string) {
  const res = await prisma?.history.findMany({
    where: {
      userId,
    },
  });
  return res;
}

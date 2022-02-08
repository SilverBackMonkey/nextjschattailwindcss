"use server";
import prisma from "@/client";

export async function getCount(type, key) {
  switch (type) {
    case 1: {
      try {
        const results: any = await prisma.casino_p_casinos.findMany({
          where: {
            OR: [
              {
                meta: {
                  some: {
                    title: {
                      contains: key,
                    },
                  },
                },
              },
              {
                casino: {
                  contains: key,
                },
              },
            ],
          },
        });
        return results?.length;
      } catch (err) {
        console.log(err);
      }
    }

    case 2: {
      try {
        const result: any = await prisma.casino_p_games.findMany({
          where: {
            OR: [
              {
                meta: {
                  some: {
                    title: {
                      contains: key,
                    },
                  },
                },
              },
              {
                game_name: {
                  contains: key,
                },
              },
            ],
          },
        });
        return result?.length;
      } catch (err) {
        console.log(err);
      }
    }
    default:
      return null;
  }
}

export async function searchData(type, key, firstPageIndex) {
  switch (type) {
    case 1: {
      try {
        const results: any = await prisma.casino_p_casinos.findMany({
          select: {
            id: true,
            casino: true,
            button: true,
            clean_name: true,
            meta: { select: { title: true } },
          },
          where: {
            OR: [
              {
                meta: {
                  some: {
                    title: {
                      startsWith: key,
                    },
                  },
                },
              },
              {
                meta: {
                  some: {
                    title: {
                      contains: key,
                    },
                  },
                },
              },
              {
                casino: {
                  startsWith: key,
                },
              },
              {
                casino: {
                  contains: key,
                },
              },
            ],
          },
          take: 5,
          skip: firstPageIndex,
        });
        return results;
      } catch (err) {
        console.log(err);
      }
    }
    case 2: {
      try {
        const result: any = await prisma.casino_p_games.findMany({
          select: {
            game_id: true,
            game_name: true,
            game_image: true,
            game_clean_name: true,
            meta: {
              select: {
                title: true,
              },
            },
          },
          where: {
            OR: [
              {
                meta: {
                  some: {
                    title: {
                      startsWith: key,
                    },
                  },
                },
              },
              {
                meta: {
                  some: {
                    title: {
                      contains: key,
                    },
                  },
                },
              },
              {
                game_name: {
                  startsWith: key,
                },
              },
              {
                game_name: {
                  contains: key,
                },
              },
            ],
          },
          take: 5,
          skip: firstPageIndex,
        });
        return result;
      } catch (err) {
        console.log(err);
      }
    }
    default:
      return null;
  }
}

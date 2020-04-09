import prisma from "@/client";

export const getLikeSlots = async (swId, pageNum) => {

    try {
        if(swId) {
            const data = await prisma.casino_p_games.findMany({
                select: {
                    game_id: true,
                    game_name: true,
                    game_clean_name: true,
                    game_reels: true,
                    game_lines: true,
                    game_image: true,
                    software: {select: {software_name: true}},
                    game_ratings: {select: {rating: true}}
                },
                where: {
                    game_software: {
                        in: swId
                    },
                    review: {
                        every : {
                        description: {
                            not: ''
                        }
                        }
                    }
                },
                take: pageNum * 5,
            });
        
        
            return data;
        }
        else {
            const data = await prisma.casino_p_games.findMany({
                select: {
                    game_id:true,
                    game_name: true,
                    game_clean_name: true,
                    game_reels: true,
                    game_lines: true,
                    game_image: true,
                    software: {select: {software_name: true}},
                    game_ratings: {select: {rating: true}}
                },
                where: {
                  review: {
                    every : {
                      description: {
                        not: ''
                      }
                    }
                  }
                },
                take: pageNum * 5,
            });
            return data;
        }
      } catch (err) {
        console.log("This is deposit area.." + err);
      }
}
import AFCCarousel from "@/components/AFCCarousel";
import prisma from "../../client";
import CasinoContent from "../components/CasinoContent";
import Gallery from "@/components/TestCarousel";
import GamblingSlotSlider from "../components/GamblingSlotSlider";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

export default async function Dash() {

    const casinos = await prisma.casino_p_casinos.findMany({
        where: {
            approved: 1,
            rogue: 0,
            bonuses: { some: { deposit: { gt: 0 } } },
        },
        select: {
            id: true,
            casino: true,
            homepageimage: true,
            bonuses: {
              orderBy: {
                position: "desc",
              },
            },
            casino_ratings: {
              select: {
                rating: true,
              },
            },
        },
        orderBy: [{ updated: "desc" }],
        take: 15
    });


    const slots: any = await prisma.casino_p_games.findMany({
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
        orderBy: {

        },
        take: 15,
      });

    return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
        <section className="py-8  px-6">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
                    Top 15 Casino List
                </h1>
            </div>
        </section>
        <section className="text-lg md:text-xl font-medium mx-4">
            {casinos && casinos.length > 0 && casinos.map((data: any) => 
                <CasinoContent casino={data} key={data.id} />        
            )}
        </section>
        <section className="py-8  px-6">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
                    Top Gambling slots
                </h1>
            </div>
        </section>
        <div className="text-lg md:text-xl font-medium">
            <GamblingSlotSlider slots={slots} />
        </div>         
    </div>
  );
}

export const metadata = {
  title: "Allfreechips Casino Content",
  description:
    "",
};

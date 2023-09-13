import Link from "next/link";
import prisma from "@/client";
import BonusFilter from "@/components/functions/bonusfilter";
import CasinoSingleCard from "@/components/CasinoSIngleCard";
import CasinoCard from "@/components/CasinoCard";
import Bonus from "@/components/Bonus";
import { GiTrophy } from "react-icons/gi";
import Homework from "@/components/Homework";
import monthYear from "@/components/functions/monthYear";
import {
  FaArrowCircleRight,
} from "react-icons/fa";
import GridGuide from "@/components/GridGuide";
import Buttonlight from "@/components/Buttonlight";
import CasinoDisplayList from "@/components/CasinoDisplayList";
import { Metadata } from "next";
import RecentNews from "./components/news/RecentNews";
export const revalidate = 300;
export const dynamic = "error";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Best online casino bonus guide with " +
    monthYear() +
    " casino bonus codes";
  const description =
    monthYear() +
    " online casino bonus codes along with detailed no deposit casino bonuses for USA and world wide players";
  return {
    title: Title,
    description: description,
  };
}

async function getCasinos() {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: {
        some: {
          nodeposit: { gt: 0 },
          freespins: { lt: 1 },
        },
      },
    },
    distinct: ["id"],
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ nodeposit: "desc" }, { deposit: "desc" }],
      },
      casino_ratings: {
        select: {
          rating: true
        }
      }
    },
    orderBy: [{ hot: "desc" }, { new: "desc" }],
    take: 5,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);

  return {bonus};
}

export default async function page() {
  const {bonus} = await getCasinos();
  const casinos = bonus;
  const cardData = {
    title: "Best US Casino",
    bonusOneTittle: "200% First Deposit Bonus",
    bonusOneValueOne: "Deposit $500",
    bonusOneValueTwo: "Play with $1000",
    casinoImage:
      "/images/casino/icons/slotsofvegas.png",
    casinoName: "Slots of Vegas",
  };
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <GridGuide />
      <div className="px-2 py-4 text-center">
        <h2 className="text-2xl font-semibold px-8 py-4 md:text-5xl md:py-14">
          Best Online Gambling Sites in US
        </h2>
      </div>

      <CasinoSingleCard data={cardData} />
      <Bonus data={casinos} />
      <div className="m-4 md:mx-32 md:mt-28">
        <h4 className="text-2xl font-medium py-2 text-left md:text-5xl md:my-4">
          {"Exclusive online casino bonuses in " + monthYear()}
        </h4>
        <p className="font-medium text-justify md:text-2xl md:my-10">
          We bring you the top rated online casino bonuses targeted to your
          location. Allfreechips also has the{" "}
          <Link href="/casino-match">Casinomatch</Link> system where you can
          further filter your very own casino top list and see updates daily.
        </p>
        <div className="px-2 md:py-2">
          <div className="font-medium flex text-xl space-x-2 md:text-3xl md:space-x-6">
            <GiTrophy className="m-1" />
            <p className="text-left">
              Golden Lion: $25 no deposit casino bonus
            </p>
          </div>
          <p className="text-base font-medium py-4 text-left md:text-2xl md:font-normal">
            Golden Lion Casino is a Great new platform featuring online slots
            from Rival as well as Betsoft. Play slots for free or use the great
            $25 no deposit casino bonus right here to make some casino coin! We
            think Golden Lion casino is a great every day casino with loads of
            great casino promotions.
          </p>
          <button className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 flex items-center justify-center rounded text-base font-medium md:my-6">
            Discover Golden Lion{" "}
            <FaArrowCircleRight className="mx-4 md:mx-6 md:my-2" />
          </button>
        </div>
        <div className="px-2 md:py-2">
          <div className="font-medium flex text-xl space-x-2 md:text-3xl md:space-x-6 md:my-8">
            <GiTrophy className="m-1" />
            <p className="text-left">
              Las Vegas USA Exclusive No Deposit Casino
            </p>
          </div>
          <p className="text-base font-medium py-4 text-left md:text-2xl md:font-normal">
            Allfreechips has a new fantastic exclusive promotion for Las Vegas
            USA Casino. Take advantage of this huge value with a FREE $25 chip +
            a 200% deposit bonus up to $5,000. Play the hottest RealTimeGaming
            slots and games with this free chip offer. Las Vegas USA Casino also
            has incredible daily, weekly and monthly promotions for all players.
            Use promo code LVUSA200 to unlock this great bonus from Las Vegas
            USA Casino.
          </p>
          <button className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 flex items-center justify-center rounded text-base font-medium md:px-20 md:my-6">
            Claim Now
            <FaArrowCircleRight className="mx-4 md:mx-6 md:my-2" />
          </button>
        </div>
      </div>

      <div className="text-left p-4 md:container mx-auto">
        <h3 className="text-2xl font-semibold md:text-5xl md:my-12">
          Allfreechips - Your source of casino codes and exclusive offers
        </h3>
        <p className="text-base font-medium my-6 text-justify  md:text-2xl">
          How about trying your hand at Microgaming, playing some slot machine,
          or completing a Royal Flush without making any casino deposits? If any
          of these activities appeal to you, Allfreechips is the place you need.
          We are the source of unlimited bonuses and casino codes for cash, free
          spins, deposit related offers, and more. With our promotional
          opportunities, all gambling enthusiasts can make use of a myriad of
          extra perks while bringing their gaming experience to the next level.
          It is our website that combines tons of bonuses and a useful casino
          guide to the most reliable online gambling platforms in the USA.
        </p>
        <p className="text-base font-medium my-6 text-justify md:text-2xl">
          With all that hype around online gambling, it is now clear that the
          era of brick and mortar casinos is coming to a dramatic end. You no
          longer need to travel thousands of miles to immerse yourself in the
          excitement of the Mirage, Bellagio or any other luxurious resort Las
          Vegas has to offer. Today all of that is available to you in the
          comfort of your own home.
        </p>
        <p className="text-base font-medium my-6 text-justify md:text-2xl">
          Online casinos have everything it takes to become more popular than
          land based ones, especially among those who are only starting their
          journey in the gambling world. That said, it may be too difficult to
          choose between hundreds of platforms to play with. If it is your case,
          it s time to leave all those worries to Allfreechips! We will provide
          you with the online casino guide and help you turn their promotional
          offers to your advantage.
        </p>
      </div>
      <div className="text-left p-4 mt-2 md:text-2xl">
        <h3 className="text-2xl font-semibold md:text-5xl">
          Use our casino guide to get huge bonuses
        </h3>
        <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
          At Allfreechips, you will find everything from lists of no deposit
          bonuses to free spin casino codes and money contests in one place. The
          bonus value may range from $5 to hundreds of dollars, depending on the
          casino you choose. For your convenience, we analyze the offers of all
          online gambling sites and provide you with the following:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>bonus value;</li>
          <li>playthrough requirements;</li>
          <li>type of software used;</li>
          <li>comprehensive reviews and rates.</li>
        </ul>
        <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
          Whether you re a fan of slot machines or feel passionate about joining
          RTG casinos, you will be able to get the most out of your gambling
          activity with casino bonus codes provided by Allfreechips. Using our
          online casino guide is the best way of trying out a site risk free.
          You do not have to make any deposits to test the gambling services and
          find out whether the casino is the one you want to deal with.
        </p>
      </div>

      <Homework />

      <div className="text-left p-4 md:mx-5">
        <h3 className="text-2xl font-semibold md:text-5xl md:my-6">
          Registration is the only step towards successful gambling
        </h3>
        <div className="flex flex-col md:flex-row">
          <div className="pr-10">
            <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
              If you are eager to never miss a trick and stay abreast of
              everything that is happening in the gambling world, its time to
              register with Allfreechips. We will keep you informed on the
              latest online casino offers and news so that you are always in the
              right place at the right time. What is more, our forum will
              provide you with the useful information like upcoming contests and
              freeroll passwords.
            </p>
            <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
              Count on Allfreechips and take advantage of every promotional
              opportunity! We will enable you to gamble in the way you want to.
            </p>
            <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
              Currently we are pushing to find the best online casino for the
              USA! is the best casino going to be from RTG or Saucify we do not
              know but you can help us. Simple find your best casino and submit
              a review, in going so you can help others decide where to play and
              get some AFC reward points to boot!
            </p>
          </div>
          <div className="border shadow-2xl shadow-gray-10 border-gray-400 rounded-lg md:w-11/12">
            <div className="p-4">
              <p className="font-medium md:text-xl md:py-4">
                INTRODUCING CASINOMATCH
              </p>
              <h3 className="text-2xl my-2 font-bold md:text-3xl md:font-medium md:py-2">
                The perfect casino is one click away
              </h3>
              <button className="flex my-4 items-center px-8 bg-sky-700 text-white dark:bg-white dark:text-black rounded-lg font-medium md: md:px-6 md:my-6 md:text-2xl">
                Find your Match
                <FaArrowCircleRight className="m-4" />
              </button>
            </div>
            <div className="bg-sky-700 p-4 text-white dark:bg-white dark:text-black rounded-b-lg">
              <h6 className="font-medium md:py-4">Why CasinoMatch?</h6>
              <div className="flex-flex-col">
                <div className="flex my-6">
                  <div className="flex flex-col">
                    <button className="my-10 mx-2 w-7 h-7 font-bold rounded-full bg-white text-sky-700 dark:bg-zinc-800 dark:text-white md:my-14">
                      1
                    </button>
                    <button className="my-10 mx-2 w-7 h-7 font-bold rounded-full bg-white text-sky-700 dark:bg-zinc-800 dark:text-white md:my-14">
                      2
                    </button>
                    <button className="mx-2 mr-4 mt-2 w-7 h-7 font-bold rounded-full bg-white text-sky-700 dark:bg-zinc-800 dark:text-white md:mt-0">
                      3
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <span className="leading-6 mb-6 md:text-lg">
                      Find Casinos that allow players from your actual location.
                    </span>
                    <span className="leading-6 mb-6 md:text-lg">
                      Identify new promotions from casinos you already play.
                    </span>
                    <span className="leading-6 mb-6 md:text-lg">
                      Locate the best Bonuses you enjoy along with games you
                      love.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecentNews />
      <hr className="md:border md:mx-24 my-8" />
    </div>
  );
}
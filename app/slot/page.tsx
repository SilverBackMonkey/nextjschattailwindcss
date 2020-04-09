import React from "react";
import Faq from "@/components/faq";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import LikeSlots from "@/components/LikeSlots";
import { GrClose } from "react-icons/gr";
import monthYear from "@/components/functions/monthYear";
import Author from "@/components/AboutAuthor";
import ProsCons from "@/components/ProsCons";
import FaqJsonLD from "@/components/FaqJsonLDX";
import CasinoHint from "@/components/CasinoHint";
import prisma from "@/client";
import MobileJump from "../components/MobileJump";
import { Metadata } from "next";
import { VscStarEmpty } from "react-icons/vsc";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { revalidatePath } from "next/cache";
import { getLikeSlots } from "../lib/Slots";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "New ONline SLots : See the latest online casino games at ALlfreechips";
  const description =
    "New online slots are being release weekly, see what the ALlfreechips staff has reviewed today. ";
  return {
    title: Title,
    description: description,
  };
}
let pageNum = 1;
async function getProps({ params }) {
  const gamedata = await prisma.casino_p_games.findMany({
    select: {
      game_id: true,
      game_name: true,
      game_clean_name: true,
      game_reels: true,
      game_lines: true,
      game_image: true,
      software: { select: { software_name: true } },
      // game_ratings: {select: {rating: true}}
    },
    where: {
      review: {
        some: {
          description: {
            not: "",
          },
        },
      },
    },
    orderBy: { game_id: "desc" },
    take: 20,
  });
  const gameTotalCount = await prisma.casino_p_games.count();
  return { gamedata, gameTotalCount };
}

export default async function PageOut({ params }) {
  const props = await getProps({ params });
  const hint_text =
    "While the odds are not as good as some table games online slots gives you that shot to win a bundle on a single bet. Hit a giant bonus round and ramp up betting to possibly break 100K.";
  const hint_title = "Are slots the best game to play";
  const prosCons = {
    pros: [
      {
        title: "New Slots",
        content:
          "We are showing the latest reviewed online slots from all casino software companies, its great to see what is being released.",
      },
      {
        title: "Exciting stuff!",
        content:
          "I think its pretty cool to see what different companies release, always amazed at some of the new slot themes or bonus rounds.",
      },
    ],
    cons: [
      {
        title: "You may not be able to play them all",
        content:
          "As we take all the slots out there, we understand you can't play them all because of the geo location restrictions different casinos impose.",
      },
    ],
  };

  const faq = [
    {
      question: "Are slots fun to play?",
      answer:
        "Slots may be the most fun you can have for a nickle, although 5 cent slots are hard to find anymore the fun of each spin is undeniable.",
    },
    {
      question: "What is Allfreechips favorite slot machine?",
      answer:
        "I loved the old original Thunderstruck Slot from Microgaming as well as T-Rex from RTG as that was the largest cash out I ever had.",
    },
    {
      question: "When they say the payout for a slot is 98% how do you loses?",
      answer:
        "the payout percentages are for the game overall, not just you. SO take into consideration people win 30-40K while others lose, in the end the casino looks to make 2% of each wager on that slot.",
    },
  ];
  const casinoData = {casino : "na", casinoId : 0}
  const gameList = props.gamedata;
  const gameTotalCount = props.gameTotalCount;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many  frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `Casino Review Pros and Cons` },
    { link: "#faq", text: `Casino Review FAQs` },
  ];

  async function loadMoreData(formData) {
    'use server'
    
    pageNum = Number(formData.get('pageNumber')) + 1
    revalidatePath("CURRENT PAGE");
  }

  const games: any = await getLikeSlots(null, pageNum);

  const gameListData = { games, casinoData, gameTotalCount, pageNum };

  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <FaqJsonLD data={faq} />
      <section className="py-8  px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
            New Online Slots For {monthYear()}
          </h1>

          <div className="flex flex-col py-4">
            <span className="">
              Author:{" "}
              <a href="#author" className="font-medium ">
                {author}
              </a>
            </span>
            <span className="text-sky-600 dark:text-white">{reviewDate}</span>
          </div>
        </div>
      </section>
      <MobileJump
        links={{ links }}
        close={<GrClose className="dark:bg-white" />}
        left={
          <CgMenuLeft className="text-white dark:text-black mx-2 text-xl" />
        }
      />

      <section className="flex flex-col mx-4 md:flex-row">
        <div className="hidden lg:w-1/4 lg:flex lg:flex-col lg:">
          <div
            className="md:flex md:flex-col"
            style={{ position: "sticky", top: "140px" }}
          >
            <span className="text-lg font-medium p-4">ON THIS PAGE</span>
            <hr className="border-sky-700 dark:border-white w-60" />
            <span className="my-4 px-4 border-l-4 font-medium border-sky-700 dark:border-white">
              Our top picks
            </span>
            <div className="my-4 flex flex-col space-y-4">
              {links.map((l) => (
                <span key={l.link}>
                  <Link href={l.link}>{l.text}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-3/4  text-lg lg:text-xl font-medium">
          <div className="flex flex-col rounded-lg">
            <p className="py-4 font-bold my-4 md:my-8">
              Latest Online Slot Machine Reviews
            </p>
            <LikeSlots 
              loadMoreData={loadMoreData}
              // getLikeSlots={getLikeSlots}
              data={gameListData}
              />
          </div>
          <CasinoHint text={hint_text} title={hint_title} />

          <div>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>
    </div>
  );
}

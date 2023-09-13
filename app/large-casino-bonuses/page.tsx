import React from "react";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import CasinoDisplayList from "@/components/CasinoDisplayList";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import monthYear from "@/components/functions/monthYear";
import Author from "@/components/AboutAuthor";
import ProsCons from "@/components/ProsCons";
import FaqJsonLD from "@/components/FaqJsonLDX";
import prisma from "@/client";
import MobileJump from "../components/MobileJump";
import { Metadata } from "next";
import BonusSlider from "@/components/BonusSlider";
import { FaArrowCircleRight } from "react-icons/fa";
import ProSchema from "@/components/ProJsonLDX";



//added to synch
async function getProps({ params }) {
 
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: {
        some: { percent: { gt: 399 } },
      },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: { deposit: "desc" },
      },
      casino_ratings: {
        select: {
          rating: true
        }
      }
    },
    take: 45,
  });
  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = monthYear() + " current casinos with 400% or greater bonuses";
  const description =
    "Our list of online casino bonuses over or equal to 400% on deposit for " +
    monthYear() +
    ".";
  return {
    title: Title,
    description: description,
  };
}

export default async function PageOut(params) {
  const props = await getProps({ params });
  const prosCons = {
    pros: [
      {
        title: "Lots of cash",
        content:
          "You get a giant bang for your buck, at least 4X the buck! Note though with the larger bonus your odds of cashing out the play though is hard..",
      },
      {
        title: "Enjoyable for a long time",
        content:
          "If you love gambling this will give you a lot of time to do it, using smaller (allowed) wagers will extend play time quite a bit, and give you more chances at hitting a large enough win to beat the wagering requirements.",
      },
    ],
    cons: [
      {
        title: "Odds on Wagering Requirements",
        content:
          "I have to say I never sat down to see if this is true but I assume the larger the bonus included into the play through the less odds you have of making that requirement.",
      },
    ],
  };

  const faq = [
    {
      question: "How much bonus cash can I really get?",
      answer:
        "This depends on the bonus itself but many will allow you to get tens of thousands in casino bonus cash.",
    },
    {
      question: "how can casinos give away so much free money?",
      answer:
        "They lend you this bonus in reality, you need to earn it like any other gambling bonus.  The play through is your enemy when taking on a large casino bonus.",
    },
    {
      question: "Do people ever cash out on giant casino bonus match offers?",
      answer:
        "Yes! this is done a lot but not near as much as not making it, if you enjoy to play this gives you the longest possible play time with little actual deposited money.",
    },
  ];
  const bdata = props.bonus;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `Big Bonus Pros and Cons` },
    { link: "#faq", text: `Big Bonus FAQs` },
  ];

  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema prosCons = {prosCons} name = "Big Bonuses" product ="Casinos with Large Bonuses" />
      <section className="py-8  px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
            TOP 400% and greater casinos bonuses for {monthYear()}
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
          <div className="bg-slate-100 dark:bg-gray-200 dark:text-black rounded-xl mt-3">
            <div className="card p-4">
              <div className="heading flex items-center border-b gap-7 pb-4">
                <span className="w-10 h-7 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  Why you should play{" "}
                  <span className="font-bold">Giant Bonus Casinos</span>
                </h2>
              </div>
              <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                The large casino bonus promotions like the 400% and greater
                casino bonuses found here are great fun if you enjoy play time.
                Take careful not of any requirements such as allowed games to
                play maximum bet sizes as you work your way towards beating the
                wager requirements
              </p>
            </div>
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
        <div className="hidden md:w-1/4 md:flex md:flex-col md:">
          <div
            className="md:flex md:flex-col"
            style={{ position: "sticky", top: "140px" }}
          >
            <span className="text-lg font-medium p-4">ON THIS PAGE</span>
            <hr className="border-sky-700 dark:border-white w-60" />
            <span className="my-4 px-4 border-l-4 font-medium border-sky-700 dark:border-white">
              Our top 400% and greater casino bonus offers
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
        <div className="lg:w-3/4  text-lg md:text-xl font-medium">
          <div className="flex flex-col rounded-lg">
          <p className="py-4 font-bold my-4 md:my-8">
              Hot Bonuses Right Now
            </p>
            <BonusSlider FaArrowCircleRight = {<FaArrowCircleRight className="mx-2" />} casinos={bdata} />
            <p className="py-4 font-bold my-4 mdmy-8">
              Complete Large Casino Bonus List
            </p>
            <CasinoDisplayList  data={bdata} />
          </div>

          <div>
            <div className="py-4 font-bold my-4 md:my-8">
              Details about casino with 400% or larger bonuses
            </div>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>
      <div className="text-left p-4 mt-2 md:mx-24 md:text-2xl">
        <h3 className="text-2xl font-semibold md:text-5xl">
          Use this casino guide to get huge bonuses
        </h3>
        <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
          These big gigantic 400% plus online casino bonuses are great fun and a
          challenge. Allfreechips delivers a comprehensive casino guide to help
          navigate all you need to know about playing these bonus casinos
          including:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>bonus value;</li>
          <li>playthrough requirements;</li>
          <li>type of software used;</li>
          <li>comprehensive reviews and rates.</li>
        </ul>
      </div>
    </div>
  );
}

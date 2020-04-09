import React from "react";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import { FaMedal } from "react-icons/fa";
import CasinoDisplayList from "@/components/CasinoDisplayList";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { RiGameFill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import monthYear from "@/components/functions/monthYear";
import Author from "@/components/AboutAuthor";
import ProsCons from "@/components/ProsCons";
import FaqJsonLD from "@/components/FaqJsonLDX";
import CasinoHint from "@/components/CasinoHint";
import TimeForNewCasino from "@/components/TimeForNewCasino";
import ProSchema from "@/components/ProJsonLDX";
import prisma from "@/client";
import MobileJump from "../components/MobileJump";
import { Metadata } from "next";
import Casino from "@/components/Casino";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Casino Bonuses : " +
    monthYear() +
    " Top online casino bonuses and bonus codes";
  const description =
    "Best Online casino bonuses including new, highest and best ones for " +
    monthYear();
  return {
    title: Title,
    description: description,
  };
}

async function getProps({ params }) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: { some: { deposit: { gt: 0 } } },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ deposit: "desc" }],
      },
      casino_ratings: {
        select: {
          rating: true
        }
      }
    },
    orderBy: [{ id: "desc" } , {hot: "desc" }, { new: "desc" }],
    take: 5,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export default async function PageOut({ params }) {
  const props = await getProps({ params });
  const hint_text =
    "Online casino that offer bonuses are fun and can lead to playing with large amounts of money you don't actually deposit. Be sure to note how many times you need to bet this amount before your allowed to cash out, do not be surprised by the casino terms!";
  const hint_title = "Casino Bonus Quick Info";
  const prosCons = {
    pros: [
      {
        title: "Best Casino Bonuses",
        content: "This is the Allfreechips selected online casino bonuses.",
      },
      {
        title: "Our Favorites together",
        content:
          "We love online casino bonuses so these are not all, but what we believe are the best for reliability, playability, game selection and of course payouts.",
      },
    ],
    cons: [
      {
        title: "Strings Attached",
        content:
          "Nothing is really free in life, casino bonuses are no different. YOU can play with the bonus amounts but unless there is a specific promotion these usually require you to play only certain games like slots, or have to wager the bonus as well as your deposit in some cases up to 40 times.",
      },
    ],
  };

  const faq = [
    {
      question: "What makes these casino bonuses stand out?",
      answer:
        "Allfreechips deals with both players and casino operators to insure there are only what we believe are reliable casinos, this starting page of casino bonuses is the select list.",
    },
    {
      question: "Will I win with these casino bonuses?",
      answer:
        "To be honest casino bonuses are a bit rigged, yes it adds a ton of play time and extra cash but its really hard to beat the odds of meeting the play-though to cash out.  It has been done hundreds of times and I personally cashed out over 200K on a bonus.",
    },
    {
      question: "I took a bonus and was really surprised when ...",
      answer:
        "With all contracts you should always read the terms. Taking a bonus is indeed a contract of sorts and you should know what is expected of you as in the amount of play through or restrictions, as well as what you expect from the casino.  For instance a lot of no deposit bonuses limit your maximum cash out.",
    },
  ];

  const bdata = props.bonus;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many  frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `Casino Bonus Pros and Cons` },
    { link: "#faq", text: `Casino Bonus FAQs` },
  ];
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema prosCons = {prosCons} name = "Casino Bonuses" product ="Different Casino Bonuses" />
      <section className="py-8  px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
            Top Online Casino Bonuses {monthYear()}
          </h1>
          <div className="grid grid-cols-2 md:grid md:grid-cols-3">
            <Link href="/no-deposit-casinos">
              <Casino
                icon={<RiGameFill className="text-4xl" />}
                title={"No Deposit Casinos"}
              />
            </Link>
            <Link href="/free-spin-casinos">
              <Casino
                icon={<FaMedal className="text-4xl" />}
                title={"Free Spins Casinos"}
              />
            </Link>
            <Link href="/large-casino-bonuses">
              <Casino
                icon={<FaMedal className="text-4xl" />}
                title={"Largest Casino Bonuses"}
              />
            </Link>
          </div>

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
                  Quick history on{" "}
                  <span className="font-bold">casinos bonuses</span>
                </h2>
                <a href="#">
                  <i className="bi bi-info-circle"></i>
                </a>
              </div>
              <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                Casino bonuses are found in both online and land based casinos
                but really made a giant impact with the Online ones. The ability
                to offer free casino credits to the masses allowed the online
                casino industry to draw a massive following, and by not having
                to pay overhead costs like land based casinos this was a great
                way to allow users to try the casino at relatively low costs.
                Over the years many types of casino bonuses or promotions have
                come up, No deposit, Free Spin, Match your deposit as well as
                cash back bonuses to only name the most popular. Allfreechips
                tries to deliver top bonuses to our players by leveraging our
                long terms partnerships with hundreds on casinos.
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
              Latest online casino bonuses
            </p>
            <CasinoDisplayList data={bdata} />
          </div>
          <CasinoHint text= {hint_text} title={hint_title} />
          <TimeForNewCasino />
          

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


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

import prisma from "@/client";
import MobileJump from "../components/MobileJump";
import { Metadata } from "next";
import Casino from "@/components/Casino";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Casino Reviews : Allfreechips dives into the world of explaining online casino reviews";
  const description =
    "Learn all about the latest casino reviews from the ALlfreechips staff. "
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
    orderBy: [{ updated: "desc" }],
    take: 5,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export default async function PageOut({ params }) {
  const props = await getProps({ params });
  const hint_text =
    "We at Allfreechips take the online casino universe pretty seriously. We review all casinos by both ,looking at the casinos themselves as well as the software they use. User reviews, Banking options and availability all play roles as well when the final casino review is completed in hopes to only offer you casinos your looking for."
  const hint_title = "Casino reviews can help pick a good one";
  const prosCons = {
    pros: [
      {
        title: "Reviewed Casinos",
        content: "Picking a new casino to play at is much easier if you can get a real review of it. We hope we have enough information in each casino review to deliver what you want.",
      },
      {
        title: "User Casino Reviews",
        content:
          "See what other real users think of these online casinos and well, then leave your feedback to make this a better place for everyone.",
      },
    ],
    cons: [
      {
        title: "Takes time to do this",
        content:
          "We cant just knock out an excelent review without knowing about each casino so we work hard to date.",
      },
    ],
  };

  const faq = [
    {
      question: "What makes these casino review great?",
      answer:
        "Allfreechips dives deep into each casino to give a meaningful casino review that you can rely on."
    },
    {
      question: "Do you ever make a bad review?",
      answer:
        "We do, but those casinos are usually in the rogue casino list that we no longer support showing, we may bring back the name and shame group if we feel it helps the users.",
    },
    {
      question: "Can I write reviews for Allfreechips?",
      answer:
        "You sure can, each casino and slot machine allows logged in users to both rate on a 1-5 vote as well as write your review on the casino or slot as well.",
    },
  ];

  const bdata = props.bonus;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many  frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `Casino Review Pros and Cons` },
    { link: "#faq", text: `Casino Review FAQs` },
  ];
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <FaqJsonLD data={faq} />
      <section className="py-8  px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
            Updated Casino Reviews For {monthYear()}
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
              Latest Online Casino Reviews
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

import React from "react";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import { FaHandsWash, FaGifts, FaGift } from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
import CasinoDisplayList from "@/components/CasinoDisplayList";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { FaAngleRight, FaBalanceScale } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import monthYear from "@/components/functions/monthYear";
import Author from "@/components/AboutAuthor";
import ProsCons from "@/components/ProsCons";
import FaqJsonLD from "@/components/FaqJsonLDX";
import CasinoHint from "@/components/CasinoHint";
import TimeForNewCasino from "@/components/TimeForNewCasino";
import Notice from "@/components/Notice";
import prisma from "@/client";
import MobileJump from "../components/MobileJump";
import { Metadata } from "next";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "USA Online Casino Guide : " +
    monthYear() +
    " Full list of casinos you can play in the USA";
  const description =
    "Complete guide to Unites States online casinos, full USA casino guide as of " +
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
      OR: [
        {
          NOT: { casino_geo: { some: { country: "US", allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: "US" } },
        },
      ],
    },
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
    },
    orderBy: [{ hot: "desc" }, { new: "desc" }],
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export default async function PageOut({ params }) {
  const props = await getProps({ params });
  const prosCons = {
    pros: [
      {
        title: "USA Online Casinos",
        content:
          "American should be free to play any casino they want, and online casinos allowing USA players may be the best route for Americans to gamble.",
      },
      {
        title: "Game whenver you like",
        content:
          "If you feel like playing slots at 4AM you can easily play at an online casino from your home in the US. Also if you likke to gamble in your pajamas that cool as well.",
      },
    ],
    cons: [
      {
        title: "Banking",
        content:
          "The cons for USA casinos is the banking sytem, they are not allowed to transfer funds for illegal online gambling yet nobody knows what illegal online gaming is so its a strange law.",
      },
    ],
  };

  const faq = [
    {
      question: "Are Online Casinos legal to play in the USA?",
      answer:
        "Yes and no, each state may have their own laws regulating online gaming and UIGEA act of 2006 stuck on the port security bill in states that banks may not transfer money from illegal online casinos. Not licensed casinos are not illegal but take this as you see fit and check with your local laws on playing any casino while in the USA.",
    },
    {
      question: "Why should I play online when we have land based US Casinos?",
      answer:
        "Just like many brick and mortar business have discovered its much less overhead to have an online presence. This allows online casinos to offer better odds on slots, bigger bonuses than land based casinos can afford to offer.",
    },
    {
      question: "Do casinos collect taxes for US players?",
      answer:
        "For the most part online casinos will not hold a tax for US taxes, this like other income is your responsibility to report and pay.  Note that federal tax on gambling is taxed at a lower rate than income, and all states vary on gambling earnings.",
    },
  ];

  const bdata = props.bonus;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `USA Casino Pros and Cons` },
    { link: "#faq", text: `USA Casino FAQs` },
  ];
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <FaqJsonLD data={faq} />
      <section className="py-8  px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
            Best USA Online Casinos {monthYear()}
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
                <button className="w-10 h-7 rounded bg-sky-700 dark:bg-zinc-800"></button>
                <h2 className="text-lg">
                  Why you should play{" "}
                  <span className="font-bold">USA Casinos</span>
                </h2>
                <a href="#">
                  <i className="bi bi-info-circle"></i>
                </a>
              </div>
              <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                At Allfreechips.com, we provide access to various Online Casinos
                for American players who believe they have the right to spend
                their money the way they want. We offer a secure and safe
                environment to play, great casino promotions, excellent customer
                service, and a wide selection of online games. If you are
                looking for the best online casino in the USA, we are sure you
                will find it on our website. We thoroughly vet all casinos
                available on our site to make sure they have a good history,
                fast payouts, and quality customer support. Moreover, you can
                also check out their reviews to know what other players say
                about them. We regularly add new USA online casinos to our list.
                So, visit our website not to miss Exclusive bonuses and
                promotions.
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
      <div className="md:flex md:flex-col" style={{position:"sticky", top:'140px'}}>
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
              Complete USA Casino guide
            </p>
            <CasinoDisplayList data={bdata} />
          </div>
          <CasinoHint />
          <TimeForNewCasino />
          <Notice />

          <div>
            <div className="text-lg font-normal">
              More about playing at USA Casinos
            </div>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>
      <div className="text-left p-4 mt-2 md:mx-24 md:text-2xl">
        <h3 className="text-2xl font-semibold md:text-5xl">
          Use our USA casino guide to get huge bonuses
        </h3>
        <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
          At Allfreechips, you will find everything from lists of no deposit
          bonuses to free spin casino codes and money contests in one place. The
          bonus value may range from $5 to hundreds of dollars, depending on the
          casino you choose. For your convenience, we analyze the offers of all
          online gambling sites and provide you with the following:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>US bonus value;</li>
          <li>playthrough requirements;</li>
          <li>type of software used;</li>
          <li>comprehensive USA reviews and rates.</li>
        </ul>
      </div>
      <div className="flex flex-col m-4 bg-sky-100 dark:bg-gray-300 dark:text-black pt-4 pb-10 px-8 text-center rounded-xl md:mx-40">
        <p className="font-medium md:text-2xl">WE&amp;VE DONE THE HOMEWORK</p>
        <h4 className="text-2xl py-4 font-medium leading-8 md:text-4xl md:my-4">
          See our top player guides for USA online casinos
        </h4>
        <ul className="font-normal py-2 items-center text-lg md:flex md:justify-around md:text-2xl">
          <li className="flex justify-center items-center">
            <FaBalanceScale className="m-2" />
            Online Casino Banking
          </li>
          <li className="flex justify-center items-center">
            <FaHandsWash className="m-2" />
            New Online Slots
          </li>
          <li className="flex justify-center items-center">
            <TbBeach className="m-2" />
            RTG Slots Machines
          </li>
          <li className="flex justify-center items-center">
            <FaGifts className="m-2" />
            Microgaming Slots
          </li>
          <li className="flex justify-center items-center">
            <FaGift className="m-2" />
            Betsoft Slots
          </li>
        </ul>
      </div>
    </div>
  );
}

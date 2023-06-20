import prisma from "@/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaAngleRight } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import Author from "../components/AboutAuthor";
import Faq from "../components/faq";
import Footer from "../components/Footer";
import BonusFilter from "../components/functions/bonusfilter";
import monthYear from "../components/functions/monthYear";
import Header from "../components/Header";
import ProsCons from "../components/ProsCons";
import FaqJsonLD from "../components/FaqJsonLDX";
import CasinoDisplayList from "../components/CasinoDisplayList";

export async function getStaticProps({ params }) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
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
    orderBy: [ { hot: "desc" }, { new: "desc" }],
    take: 20,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { props: { data: bonus } };
}

const PageOut = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const [show, setShow] = useState(true);
  const data = props.data;
  const bdata = props.data;
  const prosCons = {
    pros: [
      {
        title: "Voted best by users",
        content:
          "Other users at Allfreechips.com have created the rankings, this shows real user input in deciding what online casino is really the best.",
      },
      {
        title: "If its the best...",
        content:
          "I can't really say what a great Pro it is to be voted the best online casinos other than obviously its a giant Pro.",
      },
    ],
    cons: [
      {
        title: "None Here",
        content:
          "If we are literally speaking of the best casinos then how can we create a con to that?",
      },
    ],
  };

  const faq = [
    {
      question: "How do you rate the best casinos?",
      answer:
        "We at Allfreechips do not rank the casinos, all rankings are completed by actual users. We encourage you to also rate these great casinos with your own experience good or bad to assist others in identifying the very best online casinos.",
    },
    {
      question: "What if I don't agree the casino here is the best?",
      answer:
        "We love this question, if you do not agree please let us know why and leave your own feedback to assist the community on the best casinos out there.",
    },
  ];

  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white relative">
      <Header />
      <Head>
        <title>{`Best Online Casinos voted by users ${monthYear()}`}</title>
        <meta
          name="description"
          content="Allfreechips delivers the best online casinos with pride knowing we rely on actual user input to decide what casinos are actually the best."
        />
        <FaqJsonLD data={faq} />
        <meta property="og:image" content={data.game_image} />
      </Head>
      <div className="md:container mx-auto text-sky-700 dark:text-white">
        <div className="py-6 px-1 mt-28">
          <div className="container mx-auto">
            <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
              <span>
                <Link href="/">AFC Home</Link>
              </span>
              <FaAngleRight />
              <span>Best Casinos</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              Best Online Casinos For {monthYear()}
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
                  <button
                    name="show or hide section"
                    className="w-10 h-7 rounded bg-sky-700 dark:bg-zinc-800"
                  ></button>
                  <h2 className="text-lg">
                    All About The{" "}
                    <span className="font-bold">Best Online Casinos</span>
                  </h2>

                  <i className="bi bi-info-circle"></i>
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Ever since Allfreechips was started in 2004, we have been
                  trying our best to bring players the best online casinos and
                  to organize them in a way that makes the most sense. We found
                  that the best online casino for some players is not the best
                  casino for others. We developed the ability for our gambling
                  forum members to review and rate casinos to assist other
                  gamblers in deciding just exactly what is the best online
                  casino after all. Here we list the casinos by not only the
                  highest-ranking value, but we also look at the number of votes
                  as well to try and be sure the results are meaningful. Please
                  enjoy our best casino list and be sure to join the casino
                  forum and add your opinion as well for casinos. 2022 is a new
                  year with many new online casinos, what will the best online
                  casino of 2022 be? Well you need to vote and add your own
                  comments on the casino reviews to help others at Allfreechips
                  decide on the very best casinos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex lg:hidden justify-between bg-sky-700 px-4 py-2 items-center text-white dark:bg-white dark:text-black">
          <span className="font-medium">ON THIS PAGE</span>
          <span
            onClick={() => setShow(!show)}
            className="border-2 border-white dark:border-black p-2 flex items-center rounded px-4"
          >
            Jump to{" "}
            <CgMenuLeft className="text-white dark:text-black mx-2 text-xl" />
          </span>
        </div>
        <div
          className={`flex lg:hidden flex-col w-full fixed p-4 rounded-t-2xl justify-between z-20 bg-white dark:bg-zinc-800  text-2xl font-medium ${
            show ? "bottom-[-490px]" : "bottom-0"
          }`}
        >
          <div className="flex justify-between w-full items-center">
            <div>ON THIS PAGE</div>
            <div onClick={() => setShow(!show)} className="">
              <GrClose className="dark:bg-white" />
            </div>
          </div>
          <hr className="border-1 my-4 border-sky-700 dark:border-white" />
          <div className="flex flex-col font-normal text-lg space-x-2 space-y-4">
            <span className="font-medium border-l-2 px-4 border-sky-700 dark:border-white">
              Our top picks
            </span>

            <span>
              <Link href="#SlotReview">About the Best Casinos</Link>
            </span>
            <span>
              <Link href="#ProsCons">Pros and Cons</Link>
            </span>
            <span>
              <Link href="#LikeCasinos">Best Casino List</Link>
            </span>
            <span>
              <Link href="#faq">Best Casino FAQs</Link>
            </span>
          </div>
        </div>
        <section className="flex flex-col mx-4 md:flex-row">
          <div className="hidden md:w-1/4 md:flex md:flex-col md:">
            <span className="text-lg font-medium p-4">ON THIS PAGE</span>
            <hr className="border-sky-700 dark:border-white w-60" />
            <span className="my-4 px-4 border-l-4 font-medium border-sky-700 dark:border-white">
              Our top picks
            </span>
            <div className="my-4 flex flex-col space-y-4">
              <span>
                <Link href="#SlotReview">About the Best Casinos</Link>
              </span>
              <span>
                <Link href="#ProsCons">Pros and Cons</Link>
              </span>
              <span>
                <Link href="#LikeCasinos">Best Casino List</Link>
              </span>
              <span>
                <Link href="#faq">Best Casino FAQs</Link>
              </span>
            </div>
          </div>
          <div className="md:w-3/4  text-lg md:text-xl font-medium">
            <div className="text-lg font-normal">
              <h3 id="LikeCasinos" className="text-3xl font-semibold my-6 md:text-4xl md:my-10 scroll-mt-40">
                Best online casino list
              </h3>
             
                <CasinoDisplayList data={bdata} />
              
            </div>
            <div>
              <h3 id="SlotReview" className="text-3xl font-semibold my-4 scroll-mt-40 ">
                All About The Best Online Casinos
              </h3>
              <div className="text-lg font-normal">
                <b>Why are new online casinos popular?</b>{" "}
                <p>
                  Online casinos have become a popular form of entertainment in
                  recent years, and new online casinos are popping up all the
                  time. One of the most interesting things about new online
                  casinos is that they often offer a fresh take on the
                  traditional casino experience. For example, many new online
                  casinos offer a more immersive and interactive experience with
                  high-quality graphics, animations, and sound effects.
                  Additionally, many new online casinos offer a wider range of
                  games, including live dealer games and virtual reality games,
                  which provide a more interactive and realistic experience.
                </p>{" "}
                <b>Bonuses in New online casinos</b>{" "}
                <p>
                  Another interesting aspect of new online casinos is that they
                  often offer more generous bonuses and promotions than
                  established casinos. This is because new online casinos are
                  trying to attract players and build a customer base, and they
                  know that bonuses and promotions can be a powerful tool in
                  achieving this goal. As a result, players can often find some
                  great deals and offers at new online casinos that they may not
                  find at more established casinos..{" "}
                </p>
                <b>Latest tech and slots on new casinos</b>
                <p>
                  Finally, it&apos;s worth mentioning that new online casinos are
                  often at the forefront of technology, and they often adopt new
                  technologies and trends more quickly than established casinos.
                  For example, many new online casinos offer mobile gaming
                  options, which allow players to play their favorite games on
                  their smartphones or tablets. This provides a more convenient
                  and flexible gaming experience, and is one of the reasons why
                  mobile gaming has become so popular in recent years.
                </p>
              </div>
              <ProsCons data={prosCons} />
              <Faq data={faq} />
              <Author data={authorData} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PageOut;

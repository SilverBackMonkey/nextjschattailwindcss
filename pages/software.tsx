import Header from "../components/Header";
import Footer from "../components/Footer";
import SlotSoftware from "../components/SlotSoftware";
import Link from "next/link";
import Faq from "../components/faq";
import ProsCons from "../components/ProsCons";
import LikeSlots from "../components/LikeSlots";
import LikeCasinos from "../components/LikeCasinos";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Head from "next/head";
import { GrClose } from "react-icons/gr";
import { InferGetStaticPropsType } from "next";
import { CgMenuLeft } from "react-icons/cg";
import Author from "../components/AboutAuthor";
import monthYear from "../components/functions/monthYear";
import prisma from "@/client";
export async function getStaticProps() {
  const data = await prisma.casino_p_software.findMany({
    select: {
      id: true,
      software_name: true,
      image: true,
      link: true,
    },
  });
  // Get the number of Casinos for each software
  const numdata: any[] = await prisma.$queryRawUnsafe(
    `SELECT  m.id,CAST(sum(case when mp.casino is not null then 1 else 0 end) as INT) as coun FROM casino_p_software m
    LEFT JOIN casino_p_software_link mp ON mp.software = m.id
    GROUP BY m.id`
  );
  // get the number of games for each software
  const numGames: any[] = await prisma.$queryRawUnsafe(
    `SELECT m.id, CAST(sum(case when mp.game_software is not null then 1 else 0 end) as INT) as coun FROM casino_p_software m
    LEFT JOIN casino_p_games mp ON mp.game_software = m.id
    GROUP BY m.id`
  );
  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  function mergeOnId(a1, a2, g1) {
    let a3 = Array();
    a1.map(function (d) {
      let coun = d.coun;
      let id = d.id;
      let name = a2.find((x) => x.id === id).software_name;
      let img = a2.find((x) => x.id === id).image;
      let link = a2.find((x) => x.id === id).link;
      let games = g1.find((x) => x.id === id).coun;
      if (games && coun) {
        a3.push({
          id: id,
          name: name,
          img: img,
          count: coun,
          games: games,
          link: link,
        });
      }
    });
    return a3;
  }

  const newData = sortByKey(numdata, "coun");
  const casSoft = newData.reverse();

  const softFull = mergeOnId(casSoft, data, numGames);
  //console.log(softFull);
  return { props: { softFull } };
}

const PageOut = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const [show, setShow] = useState(true);
  const casSoft = props.softFull;
  // const likeCasinoData = props.bdata;
  // const gameList = props.gamedata;
  // const casinoname = likeCasinoData[0].casino;
  // const casinoid = likeCasinoData[0].id;
  // const casinoData = { casinoid, casinoname };
  // const gameListData = { gameList, casinoData };
  // const gameReview = { __html: data.review[0].description };

  const pros = [
    { title: "Software", content: "Software is a def pro" },
    { title: "Pro", content: "hell YHeah!!" },
    { title: "title", content: "content" },
  ];
  const cons = pros;
  const prosCons = { pros, cons };
  const faq = [
    { question: "What is Software?", answer: "Seriously your stupid" },
  ];
  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white relative">
      <Header />

      <Head>
        <title>Best casino software Providors</title>
        <meta name="description" content="Description Of Page" />
      </Head>
      <div className="md:container mx-auto text-sky-700 dark:text-white">
        <div className="py-6 px-1 mt-28">
          <div className="container mx-auto">
            <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
              <span>
                <Link href="/">AFC Home</Link>
              </span>
              <FaAngleRight />
              <span className="text-slate-500">Software</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              Best {monthYear()} Casino Software Providors
            </h1>
            <div className="flex flex-col py-4">
              <span className="">
                Author:{" "}
                <a href="" className="font-medium ">
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
                    Why you can trust{" "}
                    <span className="font-bold">allfreechips.com</span>
                  </h2>
                  <a href="#">
                    <i className="bi bi-info-circle"></i>
                  </a>
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Allfreechips is dedicated to bringing the best and latest
                  online casino bonus information. We rely on your input to
                  insure the casinos listed here are both correct and on the
                  level by leaving your reviews.
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
              <Link href="#SlotReview"> Review</Link>
            </span>
            <span>
              <Link href="#ProsCons"> Pros and Cons</Link>
            </span>
            <span>
              <Link href="#LikeCasinos">Casinos With </Link>
            </span>
            <span>
              <Link href="#LikeSlots">Slots Like </Link>
            </span>
            <span>
              <Link href="#faq">FAQs</Link>
            </span>
          </div>
        </div>
        <section className="flex flex-col mx-4 md:flex-row">
          <div className="hidden lg:w-1/4 lg:flex lg:flex-col lg:">
            <span className="text-lg font-medium p-4">ON THIS PAGE</span>
            <hr className="border-sky-700 dark:border-white w-60" />
            <span className="my-4 px-4 border-l-4 font-medium border-sky-700 dark:border-white">
              Our top picks
            </span>
            <div className="my-4 flex flex-col space-y-4">
              <span>
                <Link href="#SlotReview">Review</Link>
              </span>
              <span>
                <Link href="#ProsCons">Pros and Cons</Link>
              </span>
              <span>
                <Link href="#LikeCasinos">Casinos With</Link>
              </span>
              <span>
                <Link href="#LikeSlots">Slots Like</Link>
              </span>
              <span>
                <Link href="#faq"> FAQs</Link>
              </span>
            </div>
          </div>
          <div className="lg:w-3/4  text-lg md:text-xl font-medium">
            <SlotSoftware casSoft={casSoft} />
            <p className="py-4">AT A GLANCE</p>

            <div className="flex flex-col rounded-lg">
              <p className="py-4 font-bold my-4 md:my-8">Slot Details of the</p>
            </div>

            <div>
              <h1 id="SlotReview" className="text-3xl font-semibold my-4 scroll-mt-40">
                Review
              </h1>
              <div className="text-lg font-normal">Lots O Text HERE</div>
              <ProsCons data={prosCons} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Find Online Casinos To Play
                </h3>
                <p id="LikeCasinos" className="my-4 scroll-mt-40">
                  Casinos You Can Play The Slot Machine At
                </p>
              </div>
              <Faq data={faq} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Other slots you can play like slot
                </h3>
              </div>
              <div id="LikeSlots" className="scroll-mt-40">
                <p className="text-center my-8">Show More</p>
              </div>
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

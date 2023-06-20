import { PrismaClient } from "@prisma/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaAngleRight } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import Author from "../../components/AboutAuthor";
import CasinoDisplayList from "../../components/CasinoDisplayList";
import Faq from "../../components/faq";
import Footer from "../../components/Footer";
import BonusFilter from "../../components/functions/bonusfilter";
import monthYear from "../../components/functions/monthYear";
import Header from "../../components/Header";
import LikeCasinos from "../../components/LikeCasinos";
import LikeSlots from "../../components/LikeSlots";
import ProsCons from "../../components/ProsCons";

const prisma = new PrismaClient();
export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await prisma.casino_p_software.findMany({
    where: {
      link: slug,
    },
    select: {
      id: true,
      software_name: true,
      image: true,
    },
  });
  const swId = data[0].id;

  const gamedata = await prisma.$queryRawUnsafe(
    `SELECT s.software_name,g.game_name,g.game_clean_name,g.game_reels,g.game_lines,g.game_image FROM casino_p_games g
    
    LEFT JOIN casino_p_software s
    ON g.game_software = s.id
    LEFT JOIN casino_p_descriptions_games d
    ON g.game_id = d.parent
    WHERE game_software in (` +
      swId +
      `)
    AND d.description != ''  
    ORDER BY RANDOM ()
    LIMIT 8`
  );
  // Find X casinos that share the same software as the Current SW
  const casinodata: any[] = await prisma.$queryRawUnsafe(
    `SELECT c.id FROM casino_p_casinos c
    LEFT JOIN casino_p_software_link s 
    on s.casino = c.id
    WHERE s.software in (` +
      swId +
      `)
      AND c.approved = 1
      AND c.rogue = 0
    ORDER BY RANDOM ()
    LIMIT 20`
  );

  const likeCasinoIds = casinodata.map((x) => x.id); // make a list of casinos that matched software

  const LikeCasinoData = await prisma.casino_p_casinos.findMany({
    where: {
      id: { in: likeCasinoIds },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      button: true,
      homepageimage: true,
      bonuses: {
        orderBy: {
          position: "desc",
        },
      },
    },
  });
  const bdatav: any[] = LikeCasinoData.filter((p) => p.bonuses.length > 0);
  const bdata = BonusFilter(bdatav);

  return { props: { data, bdata, gamedata } };
}
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

const PageOut = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const [show, setShow] = useState(true);
  const data = props.data[0];
  const pageDescription =
    "Allfreechips guide to " +
    data.software_name +
    " Casinos and Slot Machines";

  const likeCasinoData = props.bdata;
  const gameList = props.gamedata;
  const casinoname = likeCasinoData[0].casino;
  const casinoid = likeCasinoData[0].id;
  const casinoData = { casinoid, casinoname };
  const gameListData = { gameList, casinoData };

  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
      <Header />
      <Head>
        <title>
          {`${data.software_name} Casinos and ${data.software_name} Slot Machines`}
        </title>
        <meta name="description" content={pageDescription} />
        <meta
          property="og:image"
          content={`https://www.allfreechips.com/image/software/${encodeURIComponent(
            data.image
          )}`}
        />
      </Head>
      <div className="md:container mx-auto text-sky-700 dark:text-white">
        <div className="py-6 px-1 mt-28">
          <div className="container mx-auto">
            <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
              <span>
                <Link href="/">AFC Home</Link>
              </span>
              <FaAngleRight />
              <span>{data.software_name} Software</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              Best {data.software_name} Casinos and Slots For {monthYear()}
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
                    Pick a Casino From{" "}
                    <span className="font-bold">{data.software_name}</span>
                  </h2>
                  <a href="#">
                    <i className="bi bi-info-circle"></i>
                  </a>
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Finding your favotite casino or even a new casino for a fresh
                  approach is easier when you know the software you like. These
                  pages sort the casinos and games by software like the current{" "}
                  {data.software_name} pages.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex md:hidden justify-between bg-sky-700 px-4 py-2 items-center text-white dark:bg-white dark:text-black">
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
          className={`flex md:hidden flex-col w-full fixed p-4 rounded-t-2xl justify-between z-20 bg-white dark:bg-zinc-800  text-2xl font-medium ${
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
              <Link href="#casino">Casinos With {data.software_name}</Link>
            </span>
            <span>
              <Link href="#slots">Slots from {data.software_name}</Link>
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
                <Link href="#casino">Casinos With {data.software_name}</Link>
              </span>
              <span>
                <Link href="#slots">Slots from {data.software_name}</Link>
              </span>
            </div>
          </div>
          <div id="casino" className="md:w-3/4  text-lg md:text-xl font-medium">
            <div className="flex flex-col rounded-lg">
              <p className="py-4 font-bold my-4 md:my-8">
                Casinos on {data.software_name}
              </p>
              <CasinoDisplayList data={props.bdata} />
            </div>

            <div>
              <h2 id="slots" className="text-3xl font-semibold my-4">
                Online Slots By {data.software_name}
              </h2>
              <LikeSlots data={gameListData} />

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

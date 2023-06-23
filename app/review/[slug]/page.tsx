import Comment from "@/app/components/Comment";
import CommentList from "@/app/components/CommentList";
import MobileJump from "@/app/components/MobileJump";
import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import BankOptions from "@/components/BankOptions";
import BonusItem from "@/components/BonusItem";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import LikeCasinos from "@/components/LikeCasinos";
import LikeSlots from "@/components/LikeSlots";
import ProsCons from "@/components/ProsCons";
import SoftwareProv from "@/components/SoftwareProv";
import cheerio from "cheerio";
import { Metadata } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import { AiOutlineExclamation } from "react-icons/ai";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { FaAngleRight } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { VscStarEmpty } from "react-icons/vsc";
import FaqJsonLD from "@/components/FaqJsonLDX";
async function getProps({ params }) {
  const slug = params.slug;

  const data: any = await prisma.casino_p_casinos.findFirst({
    where: { clean_name: slug },
    select: {
      id: true,
      casino_faq: true,
      casino_pros: true,
      casino_cons: true,
      clean_name: true,
      casino: true,
      updated: true,
      button: true,
      meta: true,
      homepageimage: true,
      bonuses: {
        orderBy: {
          position: "desc",
        },
      },
      banklist: {
        select: {
          bank_data: true,
        },
      },
      review: {
        select: {
          description: true,
        },
        orderBy: {
          ordered: "desc",
        },
      },
      softwares: {
        select: {
          softwarelist: true,
        },
      },
    },
  });
  const swId: any = data.softwares
    .filter((x) => x.softwarelist.id > 0)
    .map((x) => x.softwarelist.id);

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
      LIMIT 5`
  );
  // Find 3 casinos that share the same software as the reviewd casino
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
    LIMIT 5`
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
    take: 3,
  });

  const bdatav: any[] = LikeCasinoData.filter((p) => p.bonuses.length > 0);

  const bdata = BonusFilter(bdatav);

  data.review = data.review.map((entry) => {
    let desc = entry.description;
    const $ = cheerio.load(desc);
    $("p").addClass("my-4");
    $("h1").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h2").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h3").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h4").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h5").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h6").addClass("text-3xl font-semibold my-6 md:text-4xl");
    return { description: $.html() };
  });
  const faq = data.casino_faq;
  const pros = data.casino_pros;
  const cons = data.casino_cons;
  const prosCons = { pros, cons };
  return { data, gamedata, bdata, faq, prosCons };
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  const data = props.data;
  const Homepage =
    "https://www.allfreechips.com/image/games/" + data.homepageimage;
  return {
    title: data.meta[0]?.title ?? "Missing Title",
    description: data.meta[0]?.description ?? "Missing Description",
    openGraph: { images: Homepage },
  };
}

export default async function Review({ params }) {
  const props = await getProps({ params });
  const firstBonus = props.data.bonuses.find((v) => v.deposit > 0);
  const faq = props.faq;
  const prosCons = props.prosCons;
  const data = props.data;
  const likeCasinoData = props.bdata;
  const gameList = props.gamedata;
  const casinoReview = { __html: data.review[0].description };
  const buttondata = data.button;
  const bonuslist = data.bonuses;
  const casinoname = data.casino;
  const casinoid = data.id;
  const casinoData = { casinoid, casinoname };
  const gameListData = { gameList, casinoData };
  const bankListItems = data.banklist;
  const bankListData = { bankListItems, casinoData };
  const softwares = data.softwares;
  const softwaredata = { casinoname, softwares };
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };

  const casinoLink =
    "https://www.allfreechips.com/play_casino" + data.id + ".html";
  const bonusdata = { buttondata, bonuslist, casinoname };
  const Homepage =
    "https://www.allfreechips.com/image/games/" + data.homepageimage;

  const links = [
    { link: "#bonusList", text: `${data.casino} Bonuses` },
    { link: "#CasinoReview", text: `${data.casino} Review` },
    { link: "#ProsCons", text: `${data.casino} Pros and Cons` },
    { link: "#LikeCasinos", text: `Casinos Like ${data.casino}` },
    { link: "#LikeSlots", text: `Slots at ${data.casino}` },
    { link: "#faq", text: `${data.casino} FAQs` },
  ];

  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1 mt-28">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="/">Online Casinos</Link>
            </span>
            <FaAngleRight />
            <span>
              <Link href="/review">Reviews</Link>
            </span>
            <FaAngleRight />
            <span className="text-slate-500">{data.casino}</span>
          </div>
        </div>
      </div>

      <section className="py-8  px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
            {data.casino} Casino Review 2022
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
                  Why you can trust{" "}
                  <span className="font-bold">allfreechips.com</span>
                </h2>
                <a href="#">
                  <i className="bi bi-info-circle"></i>
                </a>
              </div>
              <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                Allfreechips is dedicated to bringing the best and latest online
                casino bonus information. We rely on your input to insure the
                casinos listed here are both correct and on the level by leaving
                your reviews.
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
        <div className="md:w-3/4  text-lg md:text-xl font-medium">
          <p className="py-4">AT A GLANCE</p>
          <div className="flex flex-col md:flex-row items-center md:space-x-16">
            <Image
              src={Homepage}
              width={440}
              height={300}
              alt={props.data.homepageimage}
            />
            <div className="flex flex-col w-full py-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="text-3xl font-medium items-center w-full">
                  {props.data.casino}
                </div>
                <div className="flex w-full justify-between md:justify-start my-4">
                  <div className="flex items-center space-x-2">
                    <span className="flex">
                      <BsFillStarFill />
                      <BsFillStarFill />
                      <BsFillStarFill />
                      <BsFillStarFill />
                      <BsFillStarFill />
                    </span>
                    <span>4.1</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="flex items-center">Review</span>
                    <span className="h-8 w-8 rounded-full bg-sky-700 text-white dark:bg-zinc-800 dark:text-white">
                      <AiOutlineExclamation className="relative top-2 left-2" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end md:flex-row">
                <div>Top Offer</div>
                <div className="flex items-center">
                  <span className="text-5xl">{firstBonus?.deposit} </span>
                  <div className="flex flex-col space-y-0 leading-4 text-base">
                    <span>
                      %
                      {(
                        (firstBonus?.deposit /
                          (firstBonus?.deposit_amount || 1)) *
                        100
                      ).toFixed(0)}
                    </span>
                    <span>Bonus</span>
                  </div>
                </div>
                <div className="font-normal">
                  up to ${firstBonus?.deposit_amount}
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-8">
                <div className="flex items-center mt-4 w-full">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">$10</span>
                    <span className="text-sm font-light">Min. Deposit</span>
                  </div>
                  <hr className="border-sky-200 w-10 h-1 rotate-90" />
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{firstBonus?.playthrough}</span>
                    <span className="text-sm font-light">Playthrough</span>
                  </div>
                  <hr className="border-sky-200 w-10 h-1 rotate-90" />
                  <div className="flex flex-col items-center">
                    <span className="text-sm">Bonus</span>
                    <span className="text-sm">details</span>
                  </div>
                </div>

                <Link
                  rel="noreferrer"
                  target="_blank"
                  href={casinoLink}
                  type="button"
                  className="bg-sky-700 text-white dark:text-white dark:bg-zinc-800 flex w-full justify-center rounded-lg items-center h-14"
                >
                  Claim Now
                  <BsArrowRightCircleFill className="mx-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg">
            <p className="py-4 font-bold my-4 md:my-8">
              MORE BONUSES AT {data.casino} CASINO
            </p>

            <BonusItem data={bonusdata} />
            <span className="text-2xl text-center py-2 md:py-6">Show more</span>
          </div>
          <div className=" bg-sky-100 dark:bg-gray-200 dark:text-black">
            <SoftwareProv data={softwaredata} />
            <BankOptions data={bankListData} />
          </div>
          <div>
            <h1 id="CasinoReview" className="text-3xl font-semibold my-4">
              {data.casino} Review
            </h1>
            <div
              className="text-lg font-normal"
              dangerouslySetInnerHTML={casinoReview}
            ></div>

            <CommentList type={1} parent={params?.slug} />

            <ProsCons data={prosCons} />
            <div className="text-lg font-normal">
              <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                How {data.casino} Casino compares to other online casinos
              </h3>
              <p id="LikeCasinos" className="my-4">
                Casinos Like {data.casino}
              </p>
              <LikeCasinos
                data={likeCasinoData}
                VscStarEmpty={<VscStarEmpty />}
                BsFillStarFill={<BsFillStarFill />}
                BsArrowRightCircleFill={
                  <BsArrowRightCircleFill className="mx-4" />
                }
              />
            </div>
            <Faq data={faq} />
            <div className="text-lg font-normal">
              <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                Slots you can play at {data.casino} Casino
              </h3>
            </div>
            <div id="LikeSlots">
              <LikeSlots data={gameListData} />
              <p className="text-center my-8">Show More</p>
            </div>
            <Author data={authorData} />
          </div>
        </div>
      </section>

    </div>
  );
}

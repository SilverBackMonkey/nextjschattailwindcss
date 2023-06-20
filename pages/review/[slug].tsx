"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import Faq from "../../components/faq";
import ProsCons from "../../components/ProsCons";
import LikeSlots from "../../components/LikeSlots";
import LikeCasinos from "../../components/LikeCasinos";
import BankOptions from "../../components/BankOptions";
import Image from "next/legacy/image";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import cheerio from "cheerio";
import BonusFilter from "../../components/functions/bonusfilter";
import {
  FaPercentage,
  FaAngleDown,
  FaAngleRight,
  FaCreativeCommonsPdAlt,
  FaCcMastercard,
} from "react-icons/fa";
import Head from "next/head";
import { FcBusinessman } from "react-icons/fc";
import { RiMailLine } from "react-icons/ri";
import { FcCurrencyExchange } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
import Collapse from "../../components/Collapse";
import {
  AiFillLinkedin,
  AiOutlineCodepenCircle,
  AiOutlineExclamation,
} from "react-icons/ai";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import Bandits from "../../components/Bandits";
import BonusItem from "../../components/BonusItem";
import Oakcasino from "../../components/DefaultCasino";
import { InferGetStaticPropsType } from "next";
import { CgMenuLeft } from "react-icons/cg";
import { PrismaClient } from "@prisma/client";
import SoftwareProv from "../../components/SoftwareProv";
import Author from "../../components/AboutAuthor";
import { GiConsoleController } from "react-icons/gi";
import { useRouter } from "next/router";
const prisma = new PrismaClient();

export async function getStaticProps({ params }) {
  const slug = params.slug;

  const data = await prisma.casino_p_casinos.findFirst({
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
  const swId = data.softwares
    .filter((x) => x.softwarelist.id > 0)
    .map((x) => x.softwarelist.id);

  const gamedata: any[] = await prisma.$queryRawUnsafe(
    `SELECT s.software_name,g.game_name,g.game_clean_name,g.game_reels,g.game_lines,g.game_image FROM casino_p_games g
      
      LEFT JOIN casino_p_software s
      ON g.game_software = s.id
      LEFT JOIN casino_p_descriptions_games d
      ON g.game_id = d.parent
      WHERE game_software in (` +
      swId +
      `)
      AND d.description != ''  
      LIMIT 5`
    // ORDER BY RANDOM ()
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
      LIMIT 5`
    // ORDER BY RANDOM ()
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
  return { props: { data, gamedata, bdata, faq, prosCons } };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

const Review = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const params = URLSearchParams();
  const router = useRouter();
  const [params, setParams] = useState(router.query);
  const [show, setShow] = useState(true);
  const [bonusPageNumber, setBonusPageNumber] = useState<number>(1);
  const [slotPageNumber, setSlotPageNumber] = useState<number>(1);
  // const firstBonus = props.data.bonuses.find((v) => v.deposit > 0);
  // const faq = props.faq;
  // const prosCons = props.prosCons;
  // const data = props.data;
  // const likeCasinoData = props.bdata;
  // const gameList = props.gamedata;
  // const casinoReview = { __html: data.review[0].description };
  // const buttondata = data.button;
  // const bonuslist = data.bonuses;
  // const casinoname = data.casino;
  // const casinoid = data.id;
  // const casinoData = { casinoid, casinoname };
  // const gameListData = { gameList, casinoData };
  // const bankListItems = data.banklist;
  // const bankListData = { bankListItems, casinoData };
  // const softwares = data.softwares;
  // const softwaredata = { casinoname, softwares };
  const [firstBonus, setFirstBonus] = useState(
    props.data.bonuses.find((v) => v.deposit > 0)
  );
  const [faq, setFaq] = useState(props.faq);
  const [prosCons, setProCons] = useState(props.prosCons);
  const [data, setData] = useState(props.data);
  const [likeCasinoData, setLikeCasinoData] = useState(props.bdata);
  const [gameList, setGameList] = useState(
    props?.gamedata ? props?.gamedata : []
  );
  const [casinoReview, setCasinoReview] = useState({
    __html: data.review[0]?.description,
  });
  const [buttondata, setButtonData] = useState(data.button);
  const [bonuslist, setBonusList] = useState(props.data.bonuses);
  const [casinoname, setCasinoName] = useState(data.casino);
  const [casinoid, setCasinoId] = useState(data.id);
  const [casinoData, setCasinoData] = useState({ casinoid, casinoname });
  const [gameListData, setGameListData] = useState({ gameList, casinoData });
  const [bankListItems, setBankListItems] = useState(data.banklist);
  const [bankListData, setBankListData] = useState({
    bankListItems,
    casinoData,
  });
  const [softwares, setSoftwares] = useState(data.softwares);
  const [softwaredata, setSoftwareData] = useState({ casinoname, softwares });
  const [bonusdata, setBonusData] = useState({
    buttondata,
    bonuslist,
    casinoname,
  });
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };

  const casinoLink =
    "https://www.allfreechips.com/play_casino" + data.id + ".html";
  const Homepage =
    "https://www.allfreechips.com/image/games/" + data.homepageimage;

  useEffect(() => {
    slotPageNumber > 1 &&
      fetch(
        `/api/review/?slug=${params.slug}&bp=${bonusPageNumber}&sp=${slotPageNumber}`
      )
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((res) => {
          setData(res.doc.data);
          setProCons(res.doc.proCons);
          setFaq(res.doc.faq);

          setCasinoName(res.doc.data.casino);
          setCasinoId(res.doc.data._id);
          setCasinoData({ casinoid, casinoname });

          setBonusList(res.doc.bonuses);
          setButtonData(res.doc.data.button);
          setLikeCasinoData(res.doc.bdata);
          setSoftwares(res.doc.data.softwares);
          setSoftwareData({ casinoname, softwares });
          setBankListItems(res.doc.data.banklist);
          setBankListData({
            bankListItems: res.doc.data.banklist,
            casinoData,
          });
          setGameListData({
            gameList: [...gameList, ...res.doc.gamedata],
            casinoData,
          });
          setGameList([...gameList, ...res.doc.gamedata]);
          setFirstBonus(res.doc.data.bonuses.find((v) => v.deposit > 0));
          setCasinoReview({
            __html: res.doc.data.review[0].description,
          });
          setBonusData({
            buttondata: res.doc.data.button,
            bonuslist: res.doc.data.bonuses,
            casinoname: res.doc.data.casino,
          });
        });
  }, [bonusPageNumber, slotPageNumber]);
  console.log(gameList);
  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
      <Header />
      <Head>
        <title>{data.meta[0]?.title ?? "Missing Title"}</title>
        <meta
          name="description"
          content={data.meta[0]?.description ?? "Missing Description"}
        />
        <meta property="og:image" content={Homepage} />
      </Head>
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
                  Allfreechips is dedicated to bringing the best and latest
                  online casino bonus information. We rely on your input to
                  insure the casinos listed here are both correct and on the
                  level by leaving your reviews.
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
            Jump to
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
              <Link href="#bonusList">{data.casino} Bonuses</Link>
            </span>

            <span>
              <Link href="#CasinoReview">{data.casino} Review</Link>
            </span>
            <span>
              <Link href="#ProsCons">{data.casino} Pros and Cons</Link>
            </span>
            <span>
              <Link href="#LikeCasinos">Casinos Like {data.casino}</Link>
            </span>
            <span>
              <Link href="#LikeSlots">Slots at {data.casino}</Link>
            </span>
            <span>
              <Link href="#faq">{data.casino} FAQs</Link>
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
                <Link href="#bonusList">{data.casino} Bonuses</Link>
              </span>

              <span>
                <Link href="#CasinoReview">{data.casino} Review</Link>
              </span>
              <span>
                <Link href="#ProsCons">{data.casino} Pros and Cons</Link>
              </span>
              <span>
                <Link href="#LikeCasinos">Casinos Like {data.casino}</Link>
              </span>
              <span>
                <Link href="#LikeSlots">Slots at {data.casino}</Link>
              </span>
              <span>
                <Link href="#faq">{data.casino} FAQs</Link>
              </span>
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
                      <span className="text-2xl">
                        {firstBonus?.playthrough}
                      </span>
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
              {/* <div
                className="flex justify-center items-center text-xl font-medium md:text-3xl py-2 md:py-6 cursor-pointer"
                onClick={() => {
                  setBonusPageNumber(bonusPageNumber + 1);
                }}
              >
                Show more
                <FaAngleDown className="mx-4 text-lg font-thin md:text-4xl" />
              </div> */}
            </div>
            <div className=" bg-sky-100 dark:bg-gray-200 dark:text-black">
              <SoftwareProv data={softwaredata} />
              <hr className="" />

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
              <ProsCons data={prosCons} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  How {data.casino} Casino compares to other online casinos
                </h3>
                <p id="LikeCasinos" className="my-4">
                  Casinos Like {data.casino}
                </p>
                <LikeCasinos data={likeCasinoData} />
              </div>
              <Faq data={faq} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Slots you can play at {data.casino} Casino
                </h3>
              </div>
              <div id="LikeSlots">
                <LikeSlots data={gameListData} />
                <div
                  className="flex justify-center items-center text-xl font-medium md:text-3xl py-2 md:py-6 cursor-pointer"
                  onClick={() => {
                    setSlotPageNumber(slotPageNumber + 1);
                  }}
                >
                  Show more
                  <FaAngleDown className="mx-4 text-lg font-thin md:text-4xl" />
                </div>
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

export default Review;

"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";
import Faq from "../../components/faq";
import ProsCons from "../../components/ProsCons";
import LikeSlots from "../../components/LikeSlots";
import LikeCasinos from "../../components/LikeCasinos";
import { FaArrowCircleRight } from "react-icons/fa";

import Slider from "../../components/Slider";
import RatingComponent from "../../components/RatingComponent";
import { useState, useEffect } from "react";
import SlotSlider from "../../components/SlotSlider";
import cheerio from "cheerio";
import { useRef } from "react";
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
// import {
//   AiFillLinkedin,
//   AiOutlineCodepenCircle,
//   AiOutlineExclamation,
// } from "react-icons/ai";
import { InferGetStaticPropsType } from "next";
import { CgMenuLeft } from "react-icons/cg";
import { PrismaClient } from "@prisma/client";
import Author from "../../components/AboutAuthor";
import ReCAPTCHA from "react-google-recaptcha";
const prisma = new PrismaClient();

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await prisma.casino_p_games.findFirst({
    where: { game_clean_name: slug },
    select: {
      game_id: true,
      game_name: true,
      game_image: true,
      game_updated: true,
      game_faq: true,
      game_pros: true,
      game_cons: true,
      meta: {
        select: {
          title: true,
          description: true,
        },
      },
      review: {
        select: {
          description: true,
        },
      },
      software: {
        select: {
          id: true,
          software_name: true,
        },
      },
      game_images: {
        select: {
          game_image_url: true,
          game_image_alt_text: true,
        },
      },
      slot_theme: {
        select: {
          theme: true,
        },
      },
    },
  });
  const img = `https://www.allfreechips.com/image/slots/${encodeURIComponent(
    data.game_images[0].game_image_url
  )}`;

  //console.log(data);
  const swId = data.software.id;

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
      LIMIT 3`
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
  });

  const bdata: any[] = LikeCasinoData.filter((p) => p.bonuses.length > 0);

  bdata.forEach(function (item, index) {
    let firstBonus = item.bonuses.find((v) => v.deposit > 0);
    let ndBonus = item.bonuses.find((v) => v.nodeposit > 0);
    item.nodeposit_type = "No Deposit";
    if (ndBonus) {
      item.nodeposit = ndBonus.nodeposit;
      item.nodepositplaythrough = ndBonus.playthrough;
      item.nodepositCode = ndBonus.code;
      if (ndBonus.code.length > 1) {
        item.ndCodeDisp = ndBonus.code;
      } else {
        item.ndCodeDisp = "No Code Used";
      }
      if (item.freespins > 0) {
        item.nodeposit_type = "Free Spins";
      }
    } else {
      item.ndCodeDisp = "No Code Used";
      item.nodeposit = 0;
      item.nodepositplaythrough = 0;
    }
    if (firstBonus) {
      item.deposit = firstBonus.deposit;
      item.depositBonus = firstBonus.deposit_amount;
      item.depositPlaythough = firstBonus.playthrough;
      item.depositCode = firstBonus.code;
      item.depositPercent = firstBonus.percent;
    } else {
      item.deposit = 0;
      item.depositBonus = 0;
      item.depositPlaythough = 0;
      item.depositCode = "No Bonus";
      item.depositPercent = 0;
    }
    if (item.depositCode.length > 1) {
      item.depCodeDisp = item.depositCode;
    } else {
      item.depCodeDisp = "No Code Used";
    }
    if (item.casino.length > 10) {
      item.casinoRevText = item.casino;
      item.casinoSiteText = "site";
    } else {
      item.casinoRevText = item.casino + " Review";
      item.casinoSiteText = "secure site";
    }

    delete item.bonuses;
  });

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
  const faq = data.game_faq;
  const pros = data.game_pros;
  const cons = data.game_cons;
  const prosCons = { pros, cons };

  return {
    props: { data, gamedata, bdata, faq, prosCons, swId, img },
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

const Review = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  let hh;

  // const img = new Image();
  // img.src = props.img;
  // img.onload = function () {
  //   const height = img.height;
  //   console.log(height);
  //   hh = img?.height;
  // };
  const recaptchaRef = React.createRef();
  const toolbarRef = useRef<HTMLIFrameElement>();
  const iframeRef = useRef<HTMLIFrameElement>();
  const sliderRef = useRef<HTMLIFrameElement>();
  const router = useRouter();
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const [show, setShow] = useState(true);
  const [params, setParams] = useState(router.query);
  const [slotPageNumber, setSlotPageNumber] = useState<number>(1);
  const [showFeedBack, setShowFeedBack] = useState(false);
  const [selectedFeedBackOption, setSelectedFeedBackOption] =
    useState<number>(0);
  // const faq = props.faq;
  // const prosCons = props.prosCons;
  // const [show, setShow] = useState(true);
  // const data = props.data;

  // const likeCasinoData = props.bdata;
  // const gameList = props.gamedata;
  // const casinoname = likeCasinoData[0].casino;
  // const casinoid = likeCasinoData[0].id;
  // const casinoData = { casinoid, casinoname };
  // const gameListData = { gameList, casinoData };
  // const gameReview = { __html: data.review[0].description };
  const [faq, setFaq] = useState(props.faq);
  const [prosCons, setProsCons] = useState(props.prosCons);
  const [data, setData] = useState(props.data);
  const [likeCasinoData, setLikeCasinoData] = useState(props.bdata);
  const [gameList, setGameList] = useState(props.gamedata);
  const [casinoname, setCasinoName] = useState(likeCasinoData[0].casino);
  const [casinoid, setCasinoId] = useState(likeCasinoData[0].id);
  const [casinoData, setCasinoData] = useState({ casinoid, casinoname });
  const [feedbackContent, setFeedbackContent] = useState(0);
  const [iframeHeight, setIframeHeight] = useState(0);
  const [toolbarHeight, setToolbarHeight] = useState(0);

  console.log(iframeHeight, "--------", toolbarHeight);
  const [gameListData, setGameListData] = useState({
    gameList,
    casinoData,
  });
  const [gameReview, setGameReview] = useState({
    __html: data.review[0].description,
  });
  const [hidden, setHidden] = useState(true);
  const [src, setSrc] = useState("");
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState(1);
  const handleRestart = () => {
    // setIframeKey(iframeKey + 1);
    setHidden(true);
  };
  const handleFullscreen = () => {
    if (fullScreen) {
      document.exitFullscreen();
    } else {
      iframeRef.current.requestFullscreen();
    }
    setFullScreen(!fullScreen);
  };

  useEffect(() => {
    const sliderHeight = sliderRef.current.offsetHeight;
    console.log(sliderHeight, "sliderHeight");
    sliderHeight > 0 && setIframeHeight(sliderHeight);
  }, []);
  React.useEffect(() => {
    // const sliderHeight = sliderRef.current.offsetHeight;
    // console.log(sliderHeight, "sliderHeight");
    // sliderHeight > 0 && setIframeHeight(sliderHeight);
    const divHeight = toolbarRef.current.offsetHeight;
    iframeHeight > 0 &&
      divHeight > 0 &&
      setToolbarHeight(iframeHeight - divHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  useEffect(() => {
    slotPageNumber > 1 &&
      fetch(`/api/slot/?slug=${params.slug}&sp=${slotPageNumber}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((res) => {
          setData(res.doc.data);
          setProsCons(res.doc.proCons);
          setFaq(res.doc.faq);
          setLikeCasinoData(res.doc.bdata);

          setCasinoName(res.doc.bdata[0].casino);
          setCasinoId(res.doc.bdata[0].id);
          setCasinoData({
            casinoid: res.doc.bdata[0].id,
            casinoname: res.doc.bdata[0].casino,
          });
          setGameListData({
            gameList: [...gameList, ...res.doc.gamedata],
            casinoData: casinoData,
          });
          setGameList([...gameList, ...res.doc.gamedata]);
        });
  }, [slotPageNumber]);
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      // Do something when the Escape key is pressed
      console.log("Escape key pressed");
      setFullScreen(false);
    }
  };

  const selectFeedBack = (e) => {
    setSelectedFeedBackOption(e);
  };
  const onReCAPTCHAChange = (response) => {
    // Handle the response token from reCAPTCHA
    console.log(response);
  };
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        document.exitFullscreen();
        setFullScreen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
      <Header />
      <Head>
        <title>{data.meta[0]?.title ?? "Missing Title"}</title>
        <meta
          name="description"
          content={data.meta[0]?.description ?? "Missing Description"}
        />
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
              <span>
                <Link href="/slot/">Reviews</Link>
              </span>
              <FaAngleRight />
              <span className="text-slate-500">{data.game_name}</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              {data.game_name} Slot Review 2022
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
        <div>Rate This game!</div>
        <div>
          <RatingComponent type="slot" id="2" />
        </div>
        <div className="flex lg:hidden justify-between bg-sky-700 px-4 py-2 items-center text-white dark:bg-white dark:text-black">
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
              <Link href="#SlotReview">{data.game_name} Review</Link>
            </span>
            <span>
              <Link href="#ProsCons">{data.game_name} Pros and Cons</Link>
            </span>
            <span>
              <Link href="#LikeCasinos">Casinos With {data.game_name}</Link>
            </span>
            <span>
              <Link href="#LikeSlots">Slots Like {data.game_name}</Link>
            </span>
            <span>
              <Link href="#faq">{data.game_name} FAQs</Link>
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
                <Link href="#SlotReview">{data.game_name} Review</Link>
              </span>
              <span>
                <Link href="#ProsCons">{data.game_name} Pros and Cons</Link>
              </span>
              <span>
                <Link href="#LikeCasinos">Casinos With {data.game_name}</Link>
              </span>
              <span>
                <Link href="#LikeSlots">Slots Like {data.game_name}</Link>
              </span>
              <span>
                <Link href="#faq">{data.game_name} FAQs</Link>
              </span>
            </div>
          </div>
          <div className="lg:w-3/4  text-lg md:text-xl font-medium">
            <p className="py-4">AT A GLANCE</p>

            <div className="w-full  flex items-center justify-center ">
              <div
                className={`w-10/12 p-1 h-full rounded-xl   border-[#0369a1] border-4`}
              >
                <div
                  className={`bg-[#333] relative  w-full   `}
                  style={{ height: iframeHeight }}
                >
                  <div
                    className={`w-full h-full  ${!hidden ? "hidden" : "block"}`}
                  >
                    <div ref={sliderRef}>
                      <SlotSlider
                        imgs={data.game_images}
                        game_id={data.game_id}
                      />
                    </div>
                    <div
                      className="flex items-center justify-center w-full cursor-pointer"
                      onClick={() => setHidden(false)}
                    >
                      <div className="absolute  cursor-pointer  md:w-2/5  py-2  max-sm:bottom-[60px] sm: bottom-[60px] bg-white rounded-lg flex md:justify-evenly justify-center items-center px-8 font-bold">
                        <span className=" ">Play for free</span>
                        <FaArrowCircleRight className="mx-1 " />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col w-full h-full ${
                      !hidden ? "block" : "hidden"
                    }`}
                  >
                    <div className={`w-full  pt-[20px] `} ref={toolbarRef}>
                      <div className="flex justify-end w-full flex-col md:flex-row ">
                        <div
                          className={`cursor-pointer z-10 mr-3 py-1 my-1  justify-center rouned-full items-center   bg-white rounded-full flex  px-4`}
                          onClick={handleFullscreen}
                        >
                          <span className="text-center ">full screen</span>
                        </div>
                        <div
                          onClick={handleRestart}
                          className={`align-middle  cursor-pointer my-1 justify-center z-10 mr-3 py-1 items-center bg-white rounded-full flex  px-4`}
                        >
                          <span className=" ">reload</span>
                        </div>
                        <div
                          className={` relative cursor-pointer z-10  mr-3 py-1 my-1 justify-center items-center bg-white rounded-full flex  px-4`}
                          onClick={() => {
                            selectFeedBack(0);
                            setShowFeedBack(!showFeedBack);
                          }}
                        >
                          <div>
                            <span className=" ">feedback</span>
                          </div>
                        </div>
                        <div
                          className={`${
                            showFeedBack ? "" : "hidden"
                          }  z-10 w-full bg-[#333] shadow-lg rounded-md p-4 origin-top-right absolute right-0 md:mt-[40px] `}
                        >
                          <p className="text-white text-2xl font-bold">
                            Game Feedback
                          </p>
                          <div>
                            <label
                              htmlFor="option1"
                              className="inline-flex items-center"
                            >
                              <input
                                type="radio"
                                name="options"
                                value={1}
                                id="option1"
                                checked={selectedFeedBackOption === 1}
                                onChange={(e) => selectFeedBack(1)}
                                className="appearance-none checked:bg-blue-500 border border-gray-300 rounded-full w-4 h-4 mr-2"
                              />
                              <span className="text-white">
                                The wrong game loaded
                              </span>
                            </label>
                          </div>
                          <div>
                            <label
                              htmlFor="option2"
                              className="inline-flex items-center"
                            >
                              <input
                                type="radio"
                                name="options"
                                value={2}
                                id="option2"
                                checked={selectedFeedBackOption === 2}
                                onChange={(e) => selectFeedBack(2)}
                                className="appearance-none checked:bg-blue-500 border border-gray-300 rounded-full w-4 h-4 mr-2"
                              />
                              <span className="text-white">
                                There are annoying popups appearing in the game
                              </span>
                            </label>
                          </div>
                          <div>
                            <label
                              htmlFor="option3"
                              className="inline-flex items-center"
                            >
                              <input
                                onChange={(e) => selectFeedBack(3)}
                                type="radio"
                                name="options"
                                value={3}
                                id="option3"
                                checked={selectedFeedBackOption === 3}
                                className="appearance-none checked:bg-blue-500 border border-gray-300 rounded-full w-4 h-4 mr-2"
                              />
                              <span className="text-white">
                                Game doesn&#39;t display the correct information
                              </span>
                            </label>
                          </div>
                          <div className="pt-4 pb-2">
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              // size="invisible"
                              sitekey={
                                "process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY"
                              }
                              onChange={onReCAPTCHAChange}
                            />
                          </div>
                          <div className="flex justify-center">
                            <button
                              className={`  cursor-pointer z-10  mr-3 py-2 my-1 flex justify-center items-center bg-white rounded-lg   px-4`}
                              onClick={() => setShowFeedBack(!showFeedBack)}
                            >
                              <span className=" ">Submit your Feedback</span>
                            </button>
                          </div>
                        </div>
                        {/* <button
                          id="refresh_game"
                          className="game-btn game-ml-5 custom_btn"
                          style={{ display: "inline-block" }}
                        >
                          Refresh Game Credit
                        </button> */}
                      </div>
                    </div>
                    <div
                      className={` w-full`}
                      style={{ height: toolbarHeight }}
                    >
                      <iframe
                        key={iframeKey}
                        name="demo_iframe.htm"
                        src={`https://democasino.betsoftgaming.com/cwguestlogin.do?bankId=675&gameId=${data.game_id}`}
                        title="casino game"
                        className={`${
                          hidden ? "hidden" : ""
                        } w-full  h-full pt-4`}
                        ref={iframeRef}
                      ></iframe>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg">
              <p className="py-4 font-bold my-4 md:my-8">
                Slot Details of the {data.game_name} Slot Machine
              </p>
            </div>

            <div>
              <h1 id="SlotReview" className="text-3xl font-semibold my-4">
                {data.game_name} Review
              </h1>
              <div
                className="text-lg font-normal"
                dangerouslySetInnerHTML={gameReview}
              ></div>
              <ProsCons data={prosCons} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Find Online Casinos To Play {data.game_name}
                </h3>
                <p id="LikeCasinos" className="my-4">
                  Casinos You Can Play The {data.game_name} Slot Machine At
                </p>
                <LikeCasinos data={likeCasinoData} />
              </div>
              <Faq data={faq} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Other slots you can play like {data.game_name} slot
                </h3>
              </div>
              <div id="LikeSlots">
                <LikeSlots data={gameListData} />
                <div
                  className="flex select-none justify-center items-center text-xl font-medium md:text-3xl py-2 md:py-6 cursor-pointer"
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

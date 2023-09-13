/* eslint-disable @next/next/no-img-element */
import MobileJump from "@/app/components/MobileJump";
import { CommentView } from "@/app/components/Comment/view";
import { RatingView } from "@/app/components/rating/view";
import { addComment } from "@/app/lib/CommentFetch";
import { setRating } from "@/app/lib/RatingFetch";
import { getLikeSlots } from "@/app/lib/Slots";
import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import BankOptions from "@/components/BankOptions";
import BonusItem from "@/components/BonusItem";
import Faq from "@/components/faq";
import FaqJsonLD from "@/components/FaqJsonLDX";
import BonusFilter from "@/components/functions/bonusfilter";
import LikeCasinos from "@/components/LikeCasinos";
import LikeSlots from "@/components/LikeSlots";
import ProSchema from "@/components/ProJsonLDX";
import ProsCons from "@/components/ProsCons";
import SoftwareProv from "@/components/SoftwareProv";
import cheerio from "cheerio";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Image from "next/legacy/image";
import Link from "next/link";
import { createElement, Fragment, Suspense } from "react";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { VscStarEmpty } from "react-icons/vsc";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { _avg } from "../../lib/Aggregation";
import RecentNews from "@/app/components/news/RecentNews";

let pageNum = 3;

const getProps = async ({ params }) => {
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
      casino_comments: {
        select: {
          id: true,
          createdAt: true,
          content: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      casino_ratings: {
        select: {
          rating: true,
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

  const swId: any = data?.softwares
    ?.filter((x) => x.softwarelist.id > 0)
    .map((x) => x.softwarelist.id);
  const gameTotalCount = await prisma.casino_p_games.count({
    where: {
      game_software: {
        in: swId,
      },
      review: {
        every: {
          description: {
            not: "",
          },
        },
      },
    },
  });

  const gamedata = await prisma.casino_p_games.findMany({
    select: {
      game_id: true,
      game_name: true,
      game_clean_name: true,
      game_reels: true,
      game_lines: true,
      game_image: true,
      software: { select: { software_name: true } },
      game_ratings: { select: { rating: true } },
    },
    where: {
      game_software: {
        in: swId,
      },
      review: {
        every: {
          description: {
            not: "",
          },
        },
      },
    },
    take: 5,
  });

  const casinodata = await prisma.casino_p_casinos.findMany({
    select: {
      id: true,
      casino_ratings: { select: { rating: true } },
    },
    where: {
      softwares: {
        some: {
          software: {
            in: swId,
          },
        },
      },
      approved: {
        equals: 1,
      },
      rogue: {
        equals: 0,
      },
    },
    take: 5,
  });

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
      casino_ratings: {
        select: {
          rating: true,
        },
      },
    },
    take: 3,
  });

  const bdatav: any[] = LikeCasinoData.filter((p) => p.bonuses.length > 0);

  const bdata = BonusFilter(bdatav);

  data["review"] = data?.review?.map((entry) => {
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
  const recentCasinoList: any = await prisma.casino_p_casinos.findMany({
    select: {
      id: true,
      button: true,
    },
    take: 15,
    orderBy: {
      id: "asc",
    },
  });

  return {
    data,
    gamedata,
    bdata,
    faq,
    prosCons,
    swId,
    recentCasinoList,
    gameTotalCount,
  };
};
export function generateStaticParams() {
  return [{ slug: "miami-club" }, { slug: "zodiac" }];
}

export const revalidate = 60;
export const dynamic = "force-static";

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  const data = props.data;
  const Homepage =
    "/images/casino/homescreen/" +
    data.clean_name +
    "-homescreen.jpg";

  return {
    title: data.meta[0]?.title ?? data.casino + " Online Casino Review",
    description:
      data.meta[0]?.description ??
      data.casino +
        " Review : Casino bonus and online slots information from " +
        data.casino,
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
  const recentCasinoList = props.recentCasinoList;
  const swId = props.swId;
  const commentsData = data.casino_comments;

  const totalCommentCount = commentsData.length;
  const myRating = _avg(data.casino_ratings);
  const votes = data.casino_ratings.length;
  const casinoReview = {
    __html: data?.review[0]?.description || "<p>There are no reviews...</p>",
  };

  const buttondata = data.button;
  const bonuslist = data.bonuses;
  const casinoname = data.casino;
  const casinoid = data.id;
  const casinoData = { casinoid, casinoname };
  const gameTotalCount = props.gameTotalCount;

  const bankListItems = data.banklist;
  const bankListData = { bankListItems, casinoData };
  const softwares = data?.softwares;
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
    "/images/casino/homescreen/" +
    data.clean_name +
    "-homescreen.jpg";

  const links = [
    { link: "#bonusList", text: `${data.casino} Bonuses` },
    { link: "#CasinoReview", text: `${data.casino} Review` },
    { link: "#ProsCons", text: `${data.casino} Pros and Cons` },
    { link: "#LikeCasinos", text: `Casinos Like ${data.casino}` },
    { link: "#LikeSlots", text: `Slots at ${data.casino}` },
    { link: "#faq", text: `${data.casino} FAQs` },
  ];

  const { result: renderedReview } = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: function RenderedLink({ href, children, className, ...rest }) {
          const canonical = "https://www.allfreechips.com";
          if (href.startsWith(canonical)) {
            href = href.slice(canonical.length);
          }
          return (
            <Link
              {...rest}
              href={href}
              className={`${
                className || ""
              } font-medium text-blue-600 dark:text-blue-500 hover:underline`}
            >
              {children}
            </Link>
          );
        },
      },
    })
    .process(casinoReview.__html);
  const product = data.casino + "online casino";
  async function loadMoreData(formData) {
    "use server";

    pageNum = Number(formData.get("pageNumber")) + 1;
    revalidatePath("CURRENT PAGE");
  }
  const games: any = await getLikeSlots(swId, pageNum);
  const gameListData = { games, casinoData, gameTotalCount, pageNum };

  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema prosCons={prosCons} name={data.casino} product={product} />
      <section className="py-8  px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
            {data.casino} Casino Review 2022
          </h1>
          <div className="flex flex-col py-4">
            <span className="">
              Author:{" "}
              <a href="#author" className="font-medium">
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
        <div className="hidden md:w-1/4 md:flex md:flex-col md:">
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
              unoptimized
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
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value}>
                          {myRating >= value && <BsFillStarFill />}
                          {myRating < value && <VscStarEmpty />}
                        </div>
                      ))}
                    </span>
                    <span>{myRating}</span>
                  </div>
                </div>
                <div className="text-2xl font-medium items-center w-full">
                  ({votes} votes)
                </div>
              </div>
              <div className="flex items-center md:items-center flex-row mt-4">
                <div>Top Offer</div>
                <hr className="border-sky-300 dark:border-white w-10 h-1 rotate-90" />
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
                <hr className="border-sky-300 dark:border-white w-10 h-1 rotate-90" />

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
                  <hr className="border-sky-300 w-10 h-1 rotate-90" />
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{firstBonus?.playthrough}</span>
                    <span className="text-sm font-light">Playthrough</span>
                  </div>
                  <hr className="border-sky-300 w-10 h-1 rotate-90" />
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
          {/* <RecentCasinoSlider casinos={recentCasinoList} FaArrowCircleRight = {<BiCaretRight className="mx-2" />} /> */}

          <div className="flex flex-col rounded-lg">
            <p className="py-4 font-bold my-4 md:my-8">
              MORE BONUSES AT {data.casino} CASINO
            </p>

            <BonusItem data={bonusdata} />
           
          </div>
          <div className=" bg-sky-100 dark:bg-gray-200 dark:text-black">
            <SoftwareProv data={softwaredata} />
            <BankOptions data={bankListData} />
          </div>
          <div>
            <h1 id="CasinoReview" className="text-3xl font-semibold my-4">
              {data.casino} Review
            </h1>
            <div className="text-lg font-normal">{renderedReview}</div>

            <Suspense fallback={<></>}>
              <RatingView
                // userEmail={user?.email}
                type={1}
                parent={casinoid}
                myRating={myRating}
                addRating={setRating}
              />
            </Suspense>

            <Suspense fallback={<></>}>
              <CommentView
                // user={user}
                type={1}
                addComment={addComment}
                parent={casinoid}
                comments={commentsData}
                totalCount={totalCommentCount}
              />
            </Suspense>

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
              <LikeSlots loadMoreData={loadMoreData} data={gameListData} />
              {/* {gameTotalCount > games.length && 
                  <form action={loadMoreData} className="text-center">
                    <input type="hidden" name="pageNumber" value={pageNum} /> 
                    <button
                      type="submit" 
                      className="text-center my-8 cursor-pointer"
                      >Show More</button>
                  </form>} */}
            </div>
            <Author data={authorData} />
          </div>
        </div>
      </section>
      <div className="mt-6 pt-6"></div>
      <RecentNews count={3} casinoCat={params.slug} />
    </div>
  );
}

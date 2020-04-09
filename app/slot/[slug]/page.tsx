/* eslint-disable @next/next/no-img-element */
import MobileJump from "@/app/components/MobileJump";
import {
  addComment,
} from "@/app/lib/CommentFetch";
import { getRating, setRating } from "@/app/lib/RatingFetch";
import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import Faq from "@/components/faq";
import FaqJsonLD from "@/components/FaqJsonLDX";
import ProSchema from "@/components/ProJsonLDX";
import BonusFilter from "@/components/functions/bonusfilter";
import LikeCasinos from "@/components/LikeCasinos";
import LikeSlots from "@/components/LikeSlots";
import ProsCons from "@/components/ProsCons";
import cheerio from "cheerio";
import { Metadata } from "next";
import Link from "next/link";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { VscStarEmpty } from "react-icons/vsc";
import { createElement, Fragment, Suspense } from "react";
import { RatingView } from "@/app/components/rating/view";
import { CommentView } from "@/app/components/Comment/view";
import { _avg } from "@/app/lib/Aggregation";
import RecentSlotSlider from "@/components/RecentSlotSlider";
import { BiCaretRight } from "react-icons/bi";
import { AiFillExclamationCircle } from "react-icons/ai";
import { revalidatePath } from "next/cache";
import { getLikeSlots } from "@/app/lib/Slots";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
/*
export const revalidate = 300;
export const dynamic = "error";
*/
export const revalidate = 60;
export const dynamic = "force-static";
let pageNum = 3;

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });

  const Title =
    props.data?.meta[0]?.title ??
    props.data?.game_name + " Online slot machine review";
  const description =
    props.data?.meta[0]?.description ??
    props.data?.game_name + " Online slot machine review";
  return {
    title: Title,
    description: description,
  };
}

async function getProps({ params }) {
  const slug = params.slug;
  const data: any = await prisma.casino_p_games.findFirst({
    where: { game_clean_name: slug },
    select: {
      game_id: true,
      game_name: true,
      game_image: true,
      game_updated: true,
      game_faq: true,
      game_pros: true,
      game_cons: true,
      game_comments: {
        select: {
          id: true,
          createdAt: true,
          content: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
          }},
        },
        orderBy:{
          createdAt: 'desc'
        }
      },
      game_ratings: {
        select: {
          rating: true
        }
      },
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

  const recentSlotList: any = await prisma.casino_p_games.findMany({
    select: {
      game_id: true,
      game_image: true,
      game_name: true,
      game_clean_name: true,
    },
    take: 15
  });

  const swId = data?.software?.id;

  const gamedata = await prisma.casino_p_games.findMany({
    select: {
      game_id: true,
      game_name: true,
      game_clean_name: true,
      game_reels: true,
      game_lines: true,
      game_image: true,
      software: {select: {software_name: true}},
      // game_ratings: {select: {rating: true}}
    },
    where: {
      game_software: swId,
      review: {
        every : {
          description: {
            not: ''
          }
        }
      }
    },
    take: 5
  });

  const gameTotalCount = await prisma.casino_p_games.count({
    where: {
      game_software: {
        equals: swId
      },
      review: {
        every : {
          description: {
            not: ''
          }
        }
      }
    }
  });

  const casinodata = await prisma.casino_p_casinos.findMany({
    select: {
      id: true,
    },
    where:{
      softwares: {
        some: {
          software: {
            equals: swId
          }
        }
      },
      approved: {
        equals: 1
      },
      rogue: {
        equals: 0
      }
    },
    take: 3
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
      // casino_ratings: {select: {rating: true}},
      bonuses: {
        orderBy: {
          position: "desc",
        },
      },
    },
  });

  const bdatav: any[] = LikeCasinoData.filter((p) => p.bonuses.length > 0);
  const bdata = BonusFilter(bdatav);
  data['review'] = data?.review?.map((entry) => {
    let desc = entry?.description;
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

  return { data, gamedata, bdata, faq, prosCons, recentSlotList, swId, gameTotalCount };
}

export function generateStaticParams() {
  return [{ slug: 'treasure-tracks' }, { slug: 'africa-x-up' }]
}

export default async function Review({ params }) {
  const props = await getProps({ params });
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const faq = props.faq;
  const prosCons = props.prosCons;
  const recentSlotList = props.recentSlotList;
  const data = props.data;
  const likeCasinoData = props.bdata;
  const gameList = props.gamedata;
  const swId = props.swId;
  const commentsData = data.game_comments;

  const totalCommentCount = commentsData.length;
  const myRating = _avg(data.game_ratings);
  const game_id = data.game_id;
  const casinoname = likeCasinoData[0]?.casino;
  const casinoid = likeCasinoData[0]?.id;
  const casinoData = { casinoid, casinoname };
  const gameTotalCount = props.gameTotalCount;
  const gameReview = { __html: data?.review[0]?.description || '<p>There are no reviews...</p>' };
  const links = [
    { link: "#SlotReview", text: `${data.game_name} Review` },
    { link: "#ProsCons", text: `${data.game_name} Pros and Cons` },
    { link: "#LikeCasinos", text: `Casinos at ${data.game_name}` },
    { link: "#LikeSlots", text: `Slots Like ${data.game_name}` },
    { link: "#faq", text: `${data.game_name} FAQs` },
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
    .process(gameReview.__html);

  const product = data.game_name + 'slot';
  async function loadMoreData(formData) {
    'use server'
    
    pageNum = Number(formData.get('pageNumber')) + 1
    revalidatePath("CURRENT PAGE");
  }

  const games: any = await getLikeSlots([swId], pageNum);

  const gameListData = { games, casinoData, gameTotalCount};

  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema prosCons = {prosCons} name = {data.game_name} product ={product} />
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
        
          <RecentSlotSlider slots={recentSlotList} FaArrowCircleRight = {<BiCaretRight className="mx-2" />} />
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
              className="text-lg font-normal">{renderedReview}</div>

            <Suspense fallback={<></>}>              
              <RatingView      
                type={2}
                parent={game_id}
                myRating={myRating}
                addRating={setRating}
              />
            </Suspense> 

            <Suspense fallback={<></>}>
              <CommentView
                type={2}
                addComment={addComment}
                parent={game_id}
                comments={commentsData}
                totalCount={totalCommentCount}
              />
            </Suspense>

            <ProsCons data={prosCons} />
            <div className="text-lg font-normal">
              <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                Find Online Casinos To Play {data.game_name}
              </h3>
              <p id="LikeCasinos" className="my-4">
                Casinos You Can Play The {data.game_name} Slot Machine At
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
                Other slots you can play like {data.game_name} slot
              </h3>
            </div>
            <div id="LikeSlots">
            <LikeSlots 
              loadMoreData={loadMoreData}
              // getLikeSlots={getLikeSlots}
              data={gameListData}
            />
            </div>
            <Author data={authorData} />
          </div>
        </div>
      </section>
    </div>
  );
}

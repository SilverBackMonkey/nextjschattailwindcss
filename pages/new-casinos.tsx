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
import prisma from "@/client";
export async function getStaticProps({ params }) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      // bonuses: { some: {  multi_currency: { contains:  '4' }, } },  // BTC IS #4
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
    orderBy: [{ id: "desc" }],
    take: 30,
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
        title: "New Casinos for new accounts",
        content:
          "Although most players fine a favorite casino to stick with and establish trust with a certain online casino, playing at a new casino may be refreshing as well. When you sign up for a new casino you are of course given whatever welcome promotions they offer.",
      },
      {
        title: "New games",
        content:
          "You may notice older casinos stick with one or two gaming providers; most new online casinos offer a large suite of casino software operators.",
      },
    ],
    cons: [
      {
        title: "Fresh Start",
        content:
          "As with most things in life sometime a fresh start makes all the difference! It's always good to keep an eye on what new options you may have out there when looking for the best new casinos.",
      },
    ],
  };

  const faq = [
    {
      question: "Are new online casinos safe?",
      answer:
        "We review casinos added to Allfreechips and only allow brands we feel are legitimate gaming casinos. If we find any issue with playing, banking or hearing from users we move quick to ensure issues are resolved or they are moved to the rogue section, something we have not had to do in quite some time.",
    },
    {
      question: "Do I get new promos at a new casino?",
      answer:
        "Of course you do, that is the number one draw for players to try new casinos. Sign up and take advantage of whatever the casino if offering for your business.",
    },
  ];

  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white relative">
      <Header />
      <Head>
        <title>
          {`New Online Casinos : ${monthYear} New Casinos on Allfreechips`}
        </title>
        <meta
          name="description"
          content={`See the latest online casinos here as we add every new casino in order, new ${monthYear} online casinos`}
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
              <span>New Casinos</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              {monthYear()} new online casinos
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
                    See the latest{" "}
                    <span className="font-bold">New Casinos</span>
                  </h2>
                  <a href="#">
                    <i className="bi bi-info-circle"></i>
                  </a>
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Showing the latest new online casinos here is a great way to
                  show you what is of course new! The list is always updated
                  showing casinos we recently added to Allfreechips, we also try
                  to only show you casinos that you can play based on your
                  location.
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
              <Link href="#LikeCasinos">New Casinos</Link>
            </span>
            <span>
              <Link href="#ProsCons"> New Casino Pros and Cons</Link>
            </span>
            <span>
              <Link href="#Review"> About New Casinos</Link>
            </span>
            <span>
              <Link href="#faq">New Casino FAQs</Link>
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
                <Link href="#LikeCasinos">New Casinos</Link>
              </span>
              <span>
                <Link href="#ProsCons"> New Casino Pros and Cons</Link>
              </span>
              <span>
                <Link href="#Review"> About New Casinos</Link>
              </span>
              <span>
                <Link href="#faq">New Casino FAQs</Link>
              </span>
            </div>
          </div>
          <div className="lg:w-3/4  text-lg md:text-xl font-medium">
            <div className="text-lg font-normal">
              <h3
                id="LikeCasinos"
                className="text-3xl font-semibold my-6 md:text-4xl md:my-10 scroll-mt-40"
              >
                List Of Newest Casinos
              </h3>

              <CasinoDisplayList data={bdata} />
            </div>
            <div>
              <h1
                id="Review"
                className="text-3xl font-semibold my-4 scroll-mt-40"
              >
                About Playing New Online Casinos
              </h1>
              <div className="text-lg font-normal">
                <b>How to choose a new online casino wisely</b>{" "}
                <p>
                  Keep your eyes open and never miss numerous opportunities
                  offered by the casinos that have just been launched. Taking
                  into account that this is a very competitive industry, you
                  will never get bored. Your choices are incredibly vast, and
                  they will only keep growing. You will always find new slot
                  sites or casino games to try your luck. In order to stand out
                  and become popular, new casino sites create various
                  interesting promotional campaigns to attract players. Sign up
                  bonuses, or grand opening contests can get them a lot of loyal
                  players. At Allfreechips.com, we are constantly looking out
                  for new casinos offering great bonuses because it’s important
                  for us to provide you with as much information as possible. Be
                  sure that with our service, you will always be the first one
                  to know about them.
                </p>
                <p>
                  However, being aware of all the opportunities is not enough
                  for spotting a trustworthy casino. Make sure that a casino
                  provides good customer support. A reliable casino usually
                  offers 24/7 support to players via online chat and other means
                  of communication. The ability to get the necessary support
                  allows an establishment to retain more players. Also, pay
                  attention to the selection of games and the variety of game
                  providers. Renowned software providers such as playtech,
                  microgaming, and Rival regularly audit and update their
                  software to ensure players are treated fairly. Thus, you can
                  rest assured that you will always have a fair game. On the
                  other hand, new casinos that use games from new software
                  companies can let you experience new game styles.
                </p>{" "}
                <b>Why choose new online casinos</b>{" "}
                <p>
                  Many online players value a big supply of games, fast
                  withdrawals, and big bonuses. And that’s exactly what new
                  casinos offer. Nowadays, to keep the players happy is like the
                  main requirement. That’s why new casinos try to offer the most
                  beneficial terms for playing games on their platforms and
                  thus, make their players come back. The casinos we list on our
                  website hold to high standards, and you can easily get access
                  to them at any time you want. Just pick a casino and enjoy the
                  games. If you are trying out a new, unrated casino, make sure
                  you leave your review after your gaming experience so that
                  other players could know what to expect. If you are a novice
                  player, look through our Casino guides, join our forum or the
                  community of players who love to gamble. It will help you
                  quickly become an expert player.{" "}
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

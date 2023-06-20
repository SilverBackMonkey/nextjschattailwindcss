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
      OR: [
        {
          bonuses: { some: { multi_currency: { contains: "4" } } },
        },
        { bonuses: { some: { multi_currency: { contains: "6" } } } },
      ],

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
    orderBy: [{ hot: "desc" }, { new: "desc" }],
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
        title: "Bitcoin is decentralized",
        content:
          "The great thing about playing with Bitcoin is that its nearly instant, and secure if your using it from your own wallet, see the Bitcoin guide if you do not understand that part.",
      },
      {
        title: "Avoid any banking concerns",
        content:
          "We have seen issue with US casinos processing Visa and Mastercard charges, as well as transferring large winnings through bank wires. Bitcoin eliminates the central banking system putting the power to spend your funds as you wish.",
      },
      {
        title: "Bitcoin appears to be a great investment",
        content:
          "So far since inception Bitcoin has outperformed the Dollar and stock markets by far, some diversity in this currency can be of great benefit in the future.",
      },
    ],
    cons: [
      {
        title: "Unstable values",
        content:
          "Although Bitcoin has outperformed most other investments it is volatile. If you are not confident in the future of Bitcoin and other crypto currencies this may be hard to stomach having funds in there.",
      },
      {
        title: "Scary when new to crypto",
        content:
          "If you have not used crypto currencies yet it may seem very difficult, yet it really is not. See out guide to using bitcoin and crypto currencies. We believe this is the future, but we also realize it's scary at first.",
      },
    ],
  };

  const faq = [
    {
      question: "Are Bitcoin casinos legal in the USA?",
      answer:
        "There is nothing illegal about Bitcoin in the US, you can freely buy it, sell it, and gamble with it. The conversion of Bitcoin to fiat currency (US dollars) is somewhat of a grey area. In the worst-case scenario, capital gains tax would apply.",
    },
    {
      question: "Is Bitcoin safe to use?",
      answer:
        "Yes, cryptocurrencies are very safe as blockchain removes the need for a centralized entity. The only thing left to do is to pick a good online casino from the list above. Here on AllFreechips.com we're listing only reputable casinos, so you're safe if you pick one of those.",
    },
    {
      question: "What are the advantages to Bitcoin Gambling?",
      answer:
        "The main advantage of Bitcoin gambling in USA is that deposits and withdrawals can't be blocked by a bank, which is often the case with fiat deposits as US banks block deposits to known gambling sites. This is not the case in Bitcoin, it bypasses the banks and the central authority.",
    },
    {
      question: "What do I need to start gambling with Bitcoin?",
      answer:
        "To start gambling in Bitcoin, you first need to buy some Bitcoin via an exchange such as Coinbase. When you have BTC in your wallet, you can send it to any.",
    },
    {
      question: "Can I deposit with a debit card and cash out via Bitcoin?",
      answer:
        "Not directly, since almost all casinos require you to deposit and withdraw using the same method. However, you may deposit US dollars via credit or debit card to a crypto exchange such as Coinbase, buy Bitcoin there, send it to a casino, and then withdraw your BTC back to Coinbase.",
    },
  ];

  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white relative">
      <Header />
      <Head>
        <title>
          Bitcoin Casinos :: Complete guide to playing online casinos that offer
          Bitcoin or other Crypto Currencies
        </title>
        <meta
          name="description"
          content="The new preferred way to play online casinos is with the use of Bitcoin or other mainstream crypto currencies.  Allfreechips has reviewed may Bitcoin casinos here."
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
              <span>Bitcoin Casinos</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              Best Bitcoin USA Casinos For {monthYear()}
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
                  <button name = "show or hide section" className="w-10 h-7 rounded bg-sky-700 dark:bg-zinc-800"></button>
                  <h2 className="text-lg">
                    All About USA {" "}
                    <span className="font-bold">Bitcoin Casinos</span>
                  </h2>
                 
                    <i className="bi bi-info-circle"></i>
                  
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Bitcoin gambling is a fantastic way to gamble in the US as the
                  deposits and withdrawals are easier and faster than with any
                  other method available to US residents. Also, apart from
                  winning in the casino you can benefit from the Bitcoin price
                  rise and therefore grow your crypto portfolio! So, choose a
                  bitcoin casino from the comprehensive list below. All of them
                  have some welcome offer you&apos;ll want to take advantage of,
                  and you&apos;ll double your Bitcoin in no time if you claim
                  one of those offers. There are casinos that give out Bitcoin
                  no deposit bonuses and Bitcoin free spins, so you can start
                  gambling in Bitcoin even if you don&apos;t currently have any
                  crypto. Of course, you&apos;ll get the most bang for your buck
                  if you take advantage one of the Bitcoin welcome bonuses as
                  they are the most rewarding.
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
              <Link href="#SlotReview">Bitcoin Review</Link>
            </span>
            <span>
              <Link href="#ProsCons"> Pros and Cons</Link>
            </span>
            <span>
              <Link href="#LikeCasinos">Bitcoin Casinos</Link>
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
                <Link href="#SlotReview">Bitcoin Review</Link>
              </span>
              <span>
                <Link href="#ProsCons"> Pros and Cons</Link>
              </span>
              <span>
                <Link href="#LikeCasinos">Bitcoin Casinos</Link>
              </span>
            </div>
          </div>
          <div className="lg:w-3/4  text-lg md:text-xl font-medium">
            <div className="text-lg font-normal">
              <h3 id="LikeCasinos" className="text-3xl font-semibold my-6 md:text-4xl md:my-10 scroll-mt-40">
                Bitcoin online casinos
              </h3>
            
                <CasinoDisplayList data={bdata} />
            
            </div>
            <div>
              <h3 id="SlotReview" className="text-3xl font-semibold my-4 scroll-mt-40">
                Playing Bitcoin USA Casinos Review
              </h3>
              <div className="text-lg font-normal">
                
                <p className="p-4">
                <b>Why gamble in Bitcoin?</b>{" "}
                  When you&apos;re gambling in Bitcoin you never have to worry
                  about your deposit or withdrawal being blocked. You&apos;re
                  off the grid, the transactions are done on the decentralized
                  blockchain, and that&apos;s the safest way to move funds. Most
                  casinos will instantly convert your Bitcoin deposit to USD,
                  therefore Bitcoin is only a vessel for transferring money, and
                  you&apos;ll still be gambling in dollars. Some casinos allow
                  gambling directly in Bitcoin.
                </p>{" "}
                
                <p className="p-4">
                <b>How to buy Bitcoin</b>{" "}
                  The easiest way to buy Bitcoin is to head over to one of the
                  crypto exchanges such as Coinbase, Crypto.com or Gemini. You
                  deposit USD and buy any cryptocurrency you like, including
                  Bitcoin. After you do that, Bitcoin will be in your wallet and
                  you can freely send it to an online casino that accepts
                  Bitcoin deposits, and then bring it back from the casino to
                  your wallet when you want.{" "}
                </p>
                <p className="p-4"><b>Bitcoin casino payouts, deposits and fees.{" "}</b>
                
                  Bitcoin deposits and withdrawals are faster than with any
                  other payment method. The only waiting time is when the casino
                  is verifying the transaction. Over the past year or so,
                  Bitcoin transaction fees were steady at around $2. Most of the
                  time the fee per transaction is between $1.50 and $2.50 so
                  that&apos;s what you can expect to pay whenever you send
                  Bitcoin somewhere. This is very affordable, especially if you
                  transfer a lot of funds. With higher amounts, Bitcoin is
                  absolutely the cheapest way to move money, as the transaction
                  fee is fixed and doesn&apos;t depend on the amount you send.
                  Some casinos even pay the fee on your behalf and therefore let
                  you withdraw your Bitcoin absolutely free, though the usual
                  $1.50-2.50 fee per transaction isn&apos;t much either. Pay
                  attention to the exchange rate and any applicable fees when
                  you&apos;re buying and selling Bitcoin at an exchange, though.
                  Fees will also apply when you&apos;ve converted your Bitcoin
                  to USD and are withdrawing USD to your bank account.
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

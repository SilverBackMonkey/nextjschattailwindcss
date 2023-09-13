
import Link from "next/link";
import {
  FaAngleRight,
  FaBalanceScale,
  FaGift,
  FaGifts,
  FaHandsWash,
} from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
import Author from "../../components/AboutAuthor";
import Faq from "../../components/faq";
import FaqJsonLD from "../../components/FaqJsonLDX";
import monthYear from "../../components/functions/monthYear";
import ProsCons from "../../components/ProsCons";
import MobileJump from "../components/MobileJump";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import ProSchema from "@/components/ProJsonLDX";

export default function NoDepositContent({ children }) {
  const jumpTo = {
    links: [
      {
        link: "#ProsCons",
        text: "No Deposit Casino Pros and Cons",
      },
      { link: "#faq", text: "No Deposit Casino FAQ" },
    ],
  };
  const prosCons = {
    pros: [
      {
        title: "Test drive many casinos",
        content:
          "There are many casinos out there so why not test a few before finding the one you trust with real money deposits? You can play for fre with a real chance at cashing out with no deposit casinos.",
      },
      {
        title: "Risk free gambling",
        content:
          "The best part with no deposit bonuses is the fact you do not need to risk your own money to play yet can still win large sums to cash out.",
      },
    ],
    cons: [
      {
        title: "Hard to cash out",
        content:
          "The biggest and really only issue when playing a no deposit casino bonus is the fact you will need to wager the bonus amount between 20-60X. This is quite a bit and the odds are not in your favor to win a lot but it is possible.",
      },
    ],
  };

  const faq = [
    {
      question: "Do casinos really give away money for no deposit bonus play?",
      answer:
        "Yes they do, but you need to wager the bonus amount as many times as the bonus states before you can cash it out. This means if you get a $20 no deposit bonus with a 40X wager requirement you will need to wager $800 before you can cash out.",
    },
    {
      question: "What happens if I win 500,000 on a no deposit casino bonus?",
      answer:
        "Most casinos do not limit the maximum withdraw on all bonuses, a lot of RTG based ones do though. Always read the terms and conditions of any bonus you take on to be sure your not suprised.",
    },
  ];
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  // const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">  
      <FaqJsonLD data={faq} />
      <ProSchema prosCons = {prosCons} name = "No Deposit" product ="No Deposit Casinos" />
      <section className="py-8  px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
            Best No Deposit Casinos For {monthYear()}
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
                  Why you should play{" "}
                  <span className="font-bold">No Deposit Casinos</span>
                </h2>
                <a href="#">
                  <i className="bi bi-info-circle"></i>
                </a>
              </div>
              <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                Allfreechips is a top teir provider of exclusive no deposit
                casino bonuses allowing you to get the largest no deposit play
                with no deposit required.
              </p>
            </div>
          </div>
        </div>
      </section>
      <MobileJump
        links={jumpTo}
        left={
          <CgMenuLeft className="text-white dark:text-black mx-2 text-xl" />
        }
        close={<GrClose className="dark:bg-white" />}
      />
      <section className="flex flex-col mx-4 md:flex-row">
        <div className="hidden lg:w-1/4 lg:flex lg:flex-col lg:">
        <div className="md:flex md:flex-col" style={{position:"sticky", top:'140px'}}>
          <span className="text-lg font-medium p-4">ON THIS PAGE</span>
          <hr className="border-sky-700 dark:border-white w-60" />
          <span className="my-4 px-4 border-l-4 font-medium border-sky-700 dark:border-white">
            Our top picks
          </span>
          <div className="my-4 flex flex-col space-y-4">
          {jumpTo.links.map(function (link, id) {
            const data = { link, id };
            return (
              <span key={id}>
                <a href= {link.link}>{link.text}</a>
              </span>
            );
          })}
          </div>
        </div>
        </div>
        <div className="lg:w-3/4  text-lg md:text-xl font-medium">
          <div className="flex flex-col rounded-lg">
            <p className="py-4 font-bold my-4 md:my-8">
              Full List of no deposit casino bonuses
            </p>
            {children}

            {/* <div
              className="flex justify-center items-center text-xl font-medium md:text-3xl py-2 md:py-6 cursor-pointer"
              // onClick={() => {
              //   setPageNumber(pageNumber + 1);
              // }}
            >
              Show more
              <FaAngleDown className="mx-4 text-lg font-thin md:text-4xl" />
            </div> */}
          </div>

          <div>
            <div className="text-lg font-normal">
              No Deposit Casino Bonus information
            </div>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>
      <div className="text-left p-4 mt-2 md:mx-24 md:text-2xl">
        <h3 className="text-2xl font-semibold md:text-5xl">
          Use our casino guide to get huge bonuses
        </h3>
        <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
          At Allfreechips, you will find everything from lists of no deposit
          bonuses to free spin casino codes and money contests in one place. The
          bonus value may range from $5 to hundreds of dollars, depending on the
          casino you choose. For your convenience, we analyze the offers of all
          online gambling sites and provide you with the following:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>bonus value;</li>
          <li>playthrough requirements;</li>
          <li>type of software used;</li>
          <li>comprehensive reviews and rates.</li>
        </ul>
      </div>
      <div className="flex flex-col m-4 bg-sky-100 dark:bg-gray-300 dark:text-black pt-4 pb-10 px-8 text-center rounded-xl md:mx-40">
        <p className="font-medium md:text-2xl">WE&apos;VE DONE THE HOMEWORK</p>
        <h4 className="text-2xl py-4 font-medium leading-8 md:text-4xl md:my-4">
          See our top player guides for online casinos
        </h4>
        <ul className="font-normal py-2 items-center text-lg md:flex md:justify-around md:text-2xl">
          <li className="flex justify-center items-center">
            <FaBalanceScale className="m-2" />
            Online Casino Banking
          </li>
          <li className="flex justify-center items-center">
            <FaHandsWash className="m-2" />
            New Online Slots
          </li>
          <li className="flex justify-center items-center">
            <TbBeach className="m-2" />
            RTG Slots Machines
          </li>
          <li className="flex justify-center items-center">
            <FaGifts className="m-2" />
            Microgaming Slots
          </li>
          <li className="flex justify-center items-center">
            <FaGift className="m-2" />
            Betsoft Slots
          </li>
        </ul>
      </div>
    </div>
  );
}

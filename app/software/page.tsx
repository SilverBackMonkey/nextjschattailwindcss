
import SlotSoftware from "@/components/SlotSoftware";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import Author from "@/components/AboutAuthor";
import monthYear from "@/components/functions/monthYear";
import prisma from "@/client";

import { Metadata } from "next";
export async function generateMetadata({ params }): Promise<Metadata> {
    const Title =
      "Complete list of online casino and slot software providers";
    const description =
      "Allfreechips complete guide to online casino software providers along with casinos and slots that use those softwares";
    return {
      title: Title,
      description: description,
    };
  }
  

async function getProps() {
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
  return { softFull };
}

export default async function  PageOut ({params}) {
  const props = await getProps();
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const casSoft = props.softFull;

/*
     <Head>
        <title>Best casino software Providors</title>
        <meta name="description" content="Description Of Page" />
      </Head>
      */
 
  return (
      <div className="md:container mx-auto text-sky-700 dark:text-white">

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
          <div className="text-lg md:text-xl font-medium">
            <SlotSoftware casSoft={casSoft} />
            <div>
              <Author data={authorData} />
            </div>
          </div>
      
      </div>

  );
};



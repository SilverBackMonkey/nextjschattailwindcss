import React from "react";
import { BsStarFill } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import Image from "next/legacy/image";
import Link from "next/link";
function LikeSlots(props) {
  const games = props.data.gameList;
  const casino = props.data.casinoData.casinoname;
  const casinoId = props.data.casinoData.casinoid;
  const bonusLink =
    "https://www.allfreechips.com/play_casino" + casinoId + ".html";
  // console.log(games);
  return (
    <>
      {games?.map((g) => (
        <div
          key={g.game_clean_name}
          className="flex flex-col rounded-2xl md:flex-row border-2 items-center p-6 my-6 md:px-20 justify-between"
        >
          <span>
            <Image
              unoptimized // avoids getting charged
              alt={g.game_name + " logo"}
              width={240}
              height={160}
              src={`https://www.allfreechips.com/image/sloticonssquare/${encodeURIComponent(
                g.game_image
              )}`}
            />
          </span>
          <div className="flex flex-col items-center">
            <h5 className="my-4">{g.software_name}</h5>
            <h3 className="text-4xl">{g.gamename}</h3>
            <div className="flex md:flex-col items-center justify-between">
              <div className="flex items-center space-x-1 my-4">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <p className="">4.1</p>
              </div>
              <div className="flex items-center space-x-3">
                <p>
                  <Link
                    href={`../slot/${encodeURIComponent(g.game_clean_name)}`}
                  >
                    {g.game_name} Review
                  </Link>
                </p>
                <AiFillExclamationCircle />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center my-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl">{g.game_lines}</span>
                <span className="font-normal text-xs">Gamelines</span>
              </div>
              <hr className="border-sky-700 dark:border-white w-10 rotate-90" />
              <div className="flex flex-col items-center">
                <span className="text-4xl">{g.game_reels}</span>
                <span className="font-normal text-xs">Gamereels</span>
              </div>
              <hr className="border-sky-700 dark:border-white w-10 rotate-90" />
              <p className="font-normal text-base leading-5">
                Game
                <br />
                details
              </p>
            </div>
            <Link
              href={bonusLink}
              rel="noreferrer"
              target="_blank"
              type="button"
              className="bg-sky-700 text-white dark:bg-white dark:text-black py-2 px-20 my-6"
            >
              Play Now
            </Link>
            <p className="font-normal text-base">
              On {casino}&#39;s secure site
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
export default LikeSlots;

"use client";
import React, { useRef, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import Image from "next/legacy/image";
import Link from "next/link";
import { _avg } from "@/app/lib/Aggregation";
import data from '@emoji-mart/data';
function LikeSlots(props) {
  const [games, setGames] = useState<any[]>(props.data.gameList);
  const [swId, setSwId] = useState<any[]>([]);
  const pageNumber = useRef<number>(1);
  const casino = props.data.casinoData?.casinoname;
  const casinoId = props.data.casinoData?.casinoid;
  const bonusLink =
    "https://www.allfreechips.com/play_casino" + casinoId + ".html";

  const ratings = games.map((g, index) => {
    return _avg(g?.game_ratings);
  }); 

  return (
    <>
      {games?.map((g, index) => (
        <div
        key={g.game_id}
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
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value}>
                    {ratings[index] >= value && (
                      <BsStarFill />
                    )}
                    {ratings[index] < value && ratings[index] > (value - 0.5) && (
                      <BsStarHalf />
                    )}
                    {ratings[index] < value && (
                      <BsStar />
                    )}
                </div>
                ))}
                <p className="">{ratings[index]?.toFixed(2)}</p>
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
      <p
        onClick={() => {
          fetch(`/api/recentSlots/?pageNumber=${pageNumber.current + 1}&swId=${swId}`, {
            next: {
              revalidate: 3,
            },
          })
            .then((res) => {
              console.log(res.json())
              if (!res.ok) {
                throw res;
              }
              return res.json();
            })
            .then((res) => {
              setGames([...games, ...res.data]);
              pageNumber.current = pageNumber.current + 1;
            })
            .catch((err) => {});
        }} 
        className="text-center my-8 cursor-pointer"
        >Show More</p>
    </>
  );
}
export default LikeSlots;

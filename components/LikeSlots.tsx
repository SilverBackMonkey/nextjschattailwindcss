import Image from "next/legacy/image";
import Link from "next/link";
import { _avg } from "@/app/lib/Aggregation";
import { BsFillStarFill } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import { AiFillExclamationCircle } from "react-icons/ai";
import { textWrap } from "@/app/lib/TextWrap";

const LikeSlots = ({data, loadMoreData}) => {

  const games = data.games;
  
  const casino = data.casinoData?.casinoname;
  const casinoId = data.casinoData?.casinoid;
  const bonusLink =
    "https://www.allfreechips.com/play_casino" + casinoId + ".html";

  const ratings = games?.map((g, index) => {
    return _avg(g?.game_ratings);
  }); 
  

  return (
    <>
      {games?.length > 0 && games?.map((g, index) => (
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
            <h5 className="my-4">{g.software.software_name}</h5>
            <h3 className="text-4xl">{textWrap(g.game_name, 15)}</h3>
            <div className="flex md:flex-col items-center justify-between">
              <div className="flex items-center space-x-1 my-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value}>
                    {ratings[index] >= value && (
                      <BsFillStarFill />
                    )}
                    {ratings[index] < value && ratings[index] > (value - 0.5) && (
                      <BsFillStarFill />
                    )}
                    {ratings[index] < value && (
                      <VscStarEmpty />
                    )}
                </div>
                ))}
                <p className="">{ratings[index]?.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-3">
                  <Link
                    href={`../slot/${encodeURIComponent(g.game_clean_name)}`}
                    type="button"
                    className="rounded-full bg-sky-700 text-white dark:bg-white dark:text-black py-2 px-4 my-6"
                  >
                    Slot Review
                    {/* <span key={index} className="word" style={{color: "#21669e",
                  textShadow: "2px 2px #444444, 1px 1px 4px black, 0 0 4px black"}}>Slot Review</span> */}
                  </Link>
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
      {parseInt(data?.gameTotalCount) > games?.length && 
      <form action={loadMoreData} className="text-center">
        <input type="hidden" name="pageNumber" value={data?.pageNum} /> 
        <button
          type="submit" 
          className="text-center my-8 cursor-pointer"
          >Show More</button>
      </form>
      }
      </>
  );
}

export default LikeSlots;

import Link from "next/link";
// import { BsFillStarFill, BsArrowRightCircleFill } from "react-icons/bs";
// import { VscStarEmpty } from "react-icons/vsc";
import LikeCasinoImage from "./LikeCasinoImage";
import { _avg } from "@/app/lib/Aggregation";
import Image from "next/image";

function LikeCasinos ({data, VscStarEmpty, BsFillStarFill, BsArrowRightCircleFill}){

  const ratings = data.map((d) => {
    return _avg(d.casino_ratings);
  })

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
      {data.map((d, index) => (
        <div
          key={d.id}
          className="flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl"
        >
          <LikeCasinoImage
            clean_name={d.clean_name}
            casinoname={d.casinoname}
          />
          
          <span>{d.casino}</span>
          <span className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
                <div key={value}>
                    {ratings[index] >= value && (
                      VscStarEmpty
                    )}
                    {ratings[index] < value && (
                      BsFillStarFill
                    )}
                </div>
                ))}
            <span className="px-2">{ratings[index]?.toFixed(2)}</span>
          </span>
          <Link
            href={`https://allfreechips.com/play_casino${encodeURIComponent(
              d.id
            )}.html`}
            rel="noreferrer"
            target="_blank"
            type="button"
            className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center"
          >
            Play Now
            {BsArrowRightCircleFill}
          </Link>
          <hr className="w-full border-sky-700 dark:border-white h-0.5" />
          <span>Deposit Bonus</span>
          <span>
            {d.depositPercent}% up to {d.currency} {d.depositBonus}
          </span>
          <hr className="w-full border-sky-700 dark:border-white h-0.5" />
          <span>No Deposit Bonus</span>
          <span>
            {d.ndcurrency}
            {d.nodeposit} {d.nodeposit_type}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LikeCasinos;

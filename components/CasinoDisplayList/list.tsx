import Image from "next/legacy/image";
import Link from "next/link";
import {
  FaArrowCircleRight,
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaCopyright,
  FaStar,
} from "react-icons/fa";
import { BonusItemTermsDisplay } from "./details";
import { BonusItemTerms } from "./selector";
import { _avg } from "@/app/lib/Aggregation";
import { BsFillStarFill } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";

export function CasinoDisplayListContent({ data }) {
  const bonusTerms =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat elit vel tellus eleifend imperdiet. Donec consectetur urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a ex dignissim, scelerisque malesuada odio. Sed vestibulum dictum eleifend.";
  const ratings = data.map(d => {
    return _avg(d.casino_ratings);
  })
  return data.map((d, index) => (
    <div
      key={d.id}
      className="border items-center border-gray-300 p-6 rounded my-4"
    >
      <div className="md:flex md:justify-between">
        <div className="flex items-center md:flex-col">
          <Image
            unoptimized // avoids getting charged
            alt={d.casino + " logo"}
            width={100}
            height={80}
            src={`https://www.allfreechips.com/image/casinoiconscut/${encodeURIComponent(
              d.button
            )}`}
          />
        </div>
        <hr className="border-sky-700 dark:border-white" />
        <div className="flex items-center justify-between py-4 md:flex-col">
          <p className="">Deposit Bonus</p>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                {d.depositPercent}%{" "}
                <span className="md:text-lg">
                  up to {d.currency}
                  {d.depositBonus}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="md:border md:h-14 border-sky-700 dark:border-white" />
        <div className="flex items-center justify-between py-4 md:flex-col">
          <p className="">{d.nodeposit_type} Bonus</p>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                {d.ndcurrency}
                {d.nodeposit}
                {d.fstext} <span className="md:text-lg">{d.ndCodeDisp}</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="border-sky-700 dark:border-white" />
        <div className="flex flex-col">
          <Link
            rel="nofollow"
            target="_blank"
            href={`https://allfreechips.com/play_casino${encodeURIComponent(
              d.id
            )}.html`}
            type="button"
            className="flex rounded bg-sky-700 text-white dark:bg-white dark:text-black py-3 my-4 justify-center items-center font-bold md:px-8"
          >
            Play Now
            <FaArrowCircleRight className="mx-2" />
          </Link>
          <p className="text-sm font-normal">
            On {d.casino}’s {d.casinoSiteText}
          </p>
        </div>
      </div>

      <div className="md:flex md:justify-between">
        <div className="flex flex-row md:flex-row md:items-center sm:items-center md:space-x-6 sm:space-x-3">
          <p className="text-sm font-medium">Approved by experts</p>
          <div className="flex items-center md:space-x-2 sm:space-x-0">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value}>
                    {ratings[index] >= value && (
                      <BsFillStarFill />
                    )}
                    {ratings[index] < value && (
                      <VscStarEmpty />
                    )}
                </div>
              ))}
          
            <p className="pl-3 font-medium">{ratings[index]?.toFixed(2)}</p>
            <FaCopyright />
          </div>
        </div>
        <BonusItemTerms
          selectorId={d.id}
          open={<FaChevronCircleDown />}
          close={<FaChevronCircleUp />}
        />
        <div className="w-[178px]">
          <h5 className="text-normal font-medium">
            <Link href={`/review/${encodeURIComponent(d.clean_name)}`}>
              {d.casinoRevText}
            </Link>
          </h5>
        </div>
      </div>
      <BonusItemTermsDisplay selectorId={d.id}>
        <div className="flex pt-3 text-sm">
          <h6>{bonusTerms}</h6>
        </div>
      </BonusItemTermsDisplay>
    </div>
  ));
}

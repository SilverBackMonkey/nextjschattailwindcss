/* eslint-disable @next/next/no-img-element */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
import Link from "next/link";
import AFCCarousel from "./AFCCarousel";
const BonusSlider = ({ casinos, FaArrowCircleRight }) => {
  return (
    <div className="border items-center border-gray-300 p-2 rounded my-4 min-h-42">
      <AFCCarousel
        responsive={responsive}
      >
        {casinos?.map((c, index) => (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <div
            className="border border-gray-300 p-6 rounded my-4 m-1"
            key={index}
          >
            <div className=" p-5">
              <Image
                height="80"
                width="100"
                src={`https://www.allfreechips.com/image/casinoiconscut/${encodeURIComponent(
                  c.button
                )}`}
                alt={c.casino + "image"}
              />
            </div>
            <span className="text-lg">{c.casino}</span>
            <div>{c.depositPercent}% Deposit Bonus</div>
            <div>
              No Deposit: {c.ndcurrency}
              {c.nodeposit ? c.nodeposit : 0}
              {c.fstext}
            </div>
            <span>
              <Link
                rel="nofollow"
                target="_blank"
                href={`https://allfreechips.com/play_casino${encodeURIComponent(
                  c.id
                )}.html`}
                type="button"
                className="flex rounded bg-sky-700 text-white dark:bg-white dark:text-black py-3 my-4 justify-center items-center font-bold md:px-8"
              >
                Play Now
                {FaArrowCircleRight}
              </Link>
            </span>
          </div>
        ))}
      </AFCCarousel>
    </div>
  );
};
export default BonusSlider;

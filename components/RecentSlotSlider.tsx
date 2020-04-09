// "use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import "react-multi-carousel/lib/styles.css";

import Link from "next/link";
import AFCCarousel from "./AFCCarousel";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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
const RecentSlotSlider = ({ slots, FaArrowCircleRight }) => {

    return (
    <div className="items-center p-2 rounded my-4 min-h-42">
       <AFCCarousel
            responsive={responsive}
      >
        {slots?.map( (s, index) => {
          return <div
            className="border border-gray-300 p-6 rounded my-4 m-1"
            key={index}
          >
            <div className="p-5">
              <img
                className="w-32 h-24"
                src={`https://www.allfreechips.com/image/sloticonssquare/${encodeURIComponent(
                  s.game_image
                )}`}
                alt={s.game_name + " image"}
              />
            </div>
            <span>
              <Link
                rel="nofollow"
                target="_blank"
                href={`../slot/${encodeURIComponent(s.game_clean_name)}`}
                type="button"
                className="flex rounded bg-sky-700 text-white dark:bg-white dark:text-black py-3 my-4 justify-center items-center font-bold md:px-8"
              >
                Review
                {FaArrowCircleRight}
              </Link>
            </span>
          </div>}
        )}
      </AFCCarousel>
    </div>
  );
};
export default RecentSlotSlider;

function getInitialProps(arg0: { req: any; }) {
  throw new Error("Function not implemented.");
}
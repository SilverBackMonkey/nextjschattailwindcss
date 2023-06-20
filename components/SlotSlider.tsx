/* eslint-disable @next/next/no-img-element */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import Link from "next/link";
const SlotSlider = ({ imgs, game_id }) => {
  const settings = {
    showArrows: true,
    showStatus: false,
    showIndicators: true,
    infiniteLoop: true,
    autoPlay: true,
    interval: 5000,
    transitionTime: 500,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    showThumbs: false,
  };
  return (
    <Carousel {...settings}>
      {imgs?.map((image, index) => (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div key={index}>
          <img
            src={`https://www.allfreechips.com/image/slots/${encodeURIComponent(
              image.game_image_url
            )}`}
            alt={
              image?.game_image_alt_text ? image?.game_image_alt_text : "image"
            }
            className="md:w-full h-full sm:w-full h-full  bg-cover"
          />
        </div>
      ))}
      {/* <Link
        href={`https://democasino.betsoftgaming.com/cwguestlogin.do?bankId=675&gameId=637`}
        rel="nofollow"
        target="_blank"
      >
        <div className="flex items-center justify-center w-full">
          <div className="absolute top-[300px] cursor-pointer  md:w-1/3 md:top-[300px] sm:w-1/2 sm:top-[200px] py-2  md:col-span-1  sm:col-span-1 xs-col-span-3 bg-[#0369a1] rounded-lg flex md:justify-evenly justify-center items-center px-8 font-bold">
            <span className=" text-white ">Play for free</span>
            <FaArrowCircleRight className="mx-2 text-white" />
          </div>
        </div>
      </Link> */}
    </Carousel>
  );
};
export default SlotSlider;

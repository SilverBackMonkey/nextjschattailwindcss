import React from "react";
import Image from "next/legacy/image";
import ima from "../public/images/imag.jpg";
import {
  FaStar,
  FaArrowCircleRight,
  FaCopyright,
  FaAngleDown,
} from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import HighRollerCard from "./HighRollerCard";
import Bonus from "./Bonus";
import Buttonlight from "./Buttonlight";

const HighRoller = () => {
  return (
    <div className="px-2 py-4 text-center">
      <h2 className="text-2xl font-semibold px-8 py-4 md:text-5xl md:py-14">
        Best Online Gambling Sites in US
      </h2>
      <div className="flex overflow-scroll md:overflow-hidden space-x-3 space-y-2 justify-center my-4">
        <Buttonlight name={"All Casino"} />
        <Buttonlight name={"All Casino"} />
        <Buttonlight name={"All Casino"} />
        <Buttonlight name={"All Casino"} />
        <Buttonlight name={"All Casino"} />
        <Buttonlight name={"All Casino"} />
        <Buttonlight name={"All Casino"} />
      </div>
      <div className="flex flex-col md:flex-row border-2 border-gray-300 p-6 rounded md:mx-80 md:p-12 md:rounded-xl space-x-8">
        <span className="bg-sky-600 dark:bg-white rounded-t-lg text-white dark:text-black p-1 md:hidden">
          TOP US CASINO
        </span>
        <Image src={ima} height={300} width={400} alt={"Lapalander"} />
        <div className="flex flex-col py-4 md:py-0 md:pl-10">
          <div className="flex flex-col md:flex-row md:space-x-16">
            <h3 className="text-xl font-medium text-center mb-10 md:mb-0">
              BEST FOR NEW PLAYERS
            </h3>
            <div className="flex items-center justify-between md:space-x-2">
              <span className="hidden md:block">Approved By Experts</span>
              <div className="flex items-center space-x-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <p className="pl-3">4.1</p>
              </div>
              <div className="flex items-center space-x-2 md:space-x-0">
                <p className="md:hidden underline font-medium">Review</p>
                <FaCopyright />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-end py-5 md:space-x-32 ">
            <h5 className="font-medium md:text-2xl">Deposit Bonus</h5>
            <div className="flex items-center space-x-4 md:items-end">
              <span className="text-base mr-2 md:text-5xl md:font-medium">
                320%
              </span>
              up to $3,200
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-end py-5 md:py-4 md:space-x-20 ">
            <h5 className="font-medium md:text-2xl">No Deposit Bonus</h5>
            <div className="flex items-center space-x-4 md:items-end">
              <span className="text-base mr-2 md:text-5xl md:font-medium">
                25
              </span>{" "}
              Free Spins
            </div>
          </div>
          <div className="flex flex-col">
            <button className="flex rounded bg-sky-700 text-white dark:bg-white dark:text-black py-3 my-4 justify-center items-center font-bold">
              Play Now
              <FaArrowCircleRight className="mx-2" />
            </button>
            <p className="text-xs font-medium">
              On Silver Oak Casino’s secure site
            </p>
          </div>
        </div>
      </div>
      <HighRollerCard />
      <HighRollerCard />
      <HighRollerCard />
      <HighRollerCard />
      <div className="flex justify-center items-center text-xl font-medium md:text-3xl ">
        Show more
        <FaAngleDown className="mx-4 text-4xl font-light" />
      </div>
      <div className="m-4 md:mx-32 md:mt-28">
        <h4 className="text-2xl font-medium py-2 text-left md:text-5xl md:my-4">
          Exclusive online casino bonuses in June 2022
        </h4>
        <p className="font-medium text-justify md:text-2xl md:my-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          volutpat elit vel tellus eleifend imperdiet. Donec consectetur urna
          sed neque rhoncus dapibus. Aenean nunc erat, lobortis a ex dignissim,
          scelerisque malesuada odio. Sed vestibulum dictum eleifend.
        </p>
        <div className="px-2 md:py-2">
          <div className="font-medium flex text-xl space-x-2 md:text-3xl md:space-x-6">
            <GiTrophy className="m-1" />
            <p className="text-left">
              Golden Lion: $25 no deposit casino bonus
            </p>
          </div>
          <p className="text-base font-medium py-4 text-left md:text-2xl md:font-normal">
            Golden Lion Casino is a Great new platfoem featuring online slots
            from Rival as well as Betsoft. Play slots for free or use the great
            $25 no deposit casino bonus right here to make some casino coin! We
            think Golden Lion casino is a great every day casino with loads of
            great casino promotions.
          </p>
          <button className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 flex items-center justify-center rounded text-base font-medium md:my-6">
            Discover Golden Lion{" "}
            <FaArrowCircleRight className="mx-4 md:mx-6 md:my-2" />
          </button>
        </div>
        <div className="px-2 md:py-2">
          <div className="font-medium flex text-xl space-x-2 md:text-3xl md:space-x-6 md:my-8">
            <GiTrophy className="m-1" />
            <p className="text-left">
              Las Vegas USA Exclusive No Deposit Casino
            </p>
          </div>
          <p className="text-base font-medium py-4 text-left md:text-2xl md:font-normal">
            Allfreechips has a new fantastic exclusive promotion for Las Vegas
            USA Casino. Take advantage of this huge value with a FREE $25 chip +
            a 200% deposit bonus up to $5,000. Play the hottest RealTimeGaming
            slots and games with this free chip offer. Las Vegas USA Casino also
            has incredible daily, weekly and monthly promotions for all players.
            Use promo code LVUSA200 to unlock this great bonus from Las Vegas
            USA Casino.
          </p>
          <button className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 flex items-center justify-center rounded text-base font-medium md:px-20 md:my-6">
            Claim Now
            <FaArrowCircleRight className="mx-4 md:mx-6 md:my-2" />
          </button>
        </div>
      </div>
      <div className="px-2 md:my-4 md:mx-20 lg:mx-80">
        <p className="text-left font-medium md:my-8 md:text-center md:text-4xl md:font-normal">
          MORE BONUSES
        </p>
        <div className="flex flex-col">
          <Bonus d={{ id: 1 }} />
         
          <div className="flex justify-center items-center text-xl font-medium md:text-3xl">
            Show more
            <FaAngleDown className="mx-4 text-lg font-thin md:text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighRoller;

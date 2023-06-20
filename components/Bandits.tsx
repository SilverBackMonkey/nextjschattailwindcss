import React from "react";
import { BsStarFill } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import Image from "next/legacy/image";
import Bandit from "../public/images/bandit.png";

const Bandits = () => {
  return (
    <div className="flex flex-col rounded-2xl md:flex-row border-2 items-center p-6 my-6 md:px-20 justify-between">
      <span>
        <Image src={Bandit} alt="Bandit" />
      </span>
      <div className="flex flex-col items-center">
        <h5 className="my-4">REAL TIME GAMING</h5>
        <h3 className="text-4xl">Cash Bandits 3</h3>
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
            <p>Review</p>
            <AiFillExclamationCircle />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center my-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl">20</span>
            <span className="font-normal text-xs">Gamelines</span>
          </div>
          <hr className="border-sky-700 dark:border-white w-10 rotate-90" />
          <div className="flex flex-col items-center">
            <span className="text-4xl">5</span>
            <span className="font-normal text-xs">Gamereels</span>
          </div>
          <hr className="border-sky-700 dark:border-white w-10 rotate-90" />
          <p className="font-normal text-base leading-5">
            Game
            <br />
            details
          </p>
        </div>
        <button className="bg-sky-700 text-white dark:bg-white dark:text-black py-2 px-20 my-6">
          Play Now
        </button>
        <p className="font-normal text-base">
          On Silver Oak Casino s secure site
        </p>
      </div>
    </div>
  );
};

export default Bandits;

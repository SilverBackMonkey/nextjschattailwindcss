"use client";
import React, { useState } from "react";
import Image from "next/legacy/image";
import lapander from "../public/images/lapander.png";
import {
  FaArrowCircleRight,
  FaChevronCircleDown,
  FaChevronCircleUp,
} from "react-icons/fa";

const Bonus = ({ d }) => {
  const [showTerms, setShowTerms] = useState<string>("");
  const bonusTerms =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat elit vel tellus eleifend imperdiet. Donec consectetur urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a ex dignissim, scelerisque malesuada odio. Sed vestibulum dictum eleifend.";
  return (
    <div className="  border-2 rounded-xl p-4  mb-4 ">
      <div className=" flex flex-col md:flex-row md:justify-evenly ">
        <div className="flex items-center md:flex-col">
          <Image src={lapander} width={200} height={80} alt={"Lapander"} />
        </div>
        <div className="flex items-center justify-between px-4  md:flex-col">
          <span className="flex flex-col font-medium text-lg md:text-4xl md:px-4">
            25
          </span>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                <span className="md:text-lg">
                  FREE<span>SPINS</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="md:border md:h-20 border-sky-700 dark:border-white" />

        <div className="flex items-center justify-between px-4 md:flex-col">
          <span className="flex flex-col font-medium text-lg md:text-4xl md:px-4">
            $0
          </span>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                <span className="md:text-lg">Min.deposit</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="md:border md:h-20 border-sky-700 dark:border-white" />
        <div className="flex items-center justify-between px-4 md:flex-col">
          <span className="flex flex-col font-medium text-lg md:text-4xl md:px-4">
            50x
          </span>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                <span className="md:text-lg">Playthrough</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center px-4 bg-sky-700 text-white dark:bg-white dark:text-black  rounded-xl text-lg font-medium  ">
          <div className="flex justify-center  items-center">
            <div>Claim Now</div>
            <FaArrowCircleRight className="ml-6" />
          </div>
        </div>
      </div>
      <div
        className="flex items-center cursor-pointer justify-center mt-2"
        onClick={() => setShowTerms(showTerms === d.id ? null : d.id)}
      >
        <span className="font-medium leading-4 select-none pr-4 md:text-2xl">
          Bonus details
        </span>
        {showTerms === d.id ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
      </div>
      {showTerms === d.id && (
        <div className=" pt-3 text-sm">
          <div>{bonusTerms}</div>
        </div>
      )}
    </div>
  );
};

export default Bonus;

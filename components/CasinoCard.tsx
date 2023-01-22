import React from "react";
import Image from "next/image";
import lapander from "../public/images/lapander.png";
import { FaStar, FaCopyright, FaArrowCircleRight } from "react-icons/fa";

const CasinoCard = (data) => {
  const casinos = data.data;
  return (
    <>
    {casinos.map((casino,id) =>( 
    <div key= {id} className="border-1 border-2 items-center border-gray-300 p-6 rounded my-8 md:mx-8 md:p-12 md:rounded-xl ">
      <div className="md:flex md:justify-between">
        <div className="flex items-center md:flex-col">
          <Image src={lapander} alt={"High Roller Card"} />
        </div>
        <hr className="border-sky-700 dark:border-white" />
        <div className="flex items-center justify-between py-4 md:flex-col">
          <p className="">Deposit Bonus</p>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                320% <span className="md:text-lg">up to $3,200</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="md:border md:h-14 border-sky-700 dark:border-white" />
        <div className="flex items-center justify-between py-4 md:flex-col">
          <p className="">No Deposit Bonus</p>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                25 <span className="md:text-lg">Free Spins</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="border-sky-700 dark:border-white" />
        <div className="flex flex-col">
          <button className="flex rounded bg-sky-700 text-white dark:bg-white dark:text-black py-3 my-4 justify-center items-center font-bold md:px-8">
            Play Now
            <FaArrowCircleRight className="mx-2" />
          </button>
          <p className="text-sm font-normal">On Planet 7 Casino’s secure site</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-row md:flex-row md:items-center sm:items-center space-x-6">
          <p className="text-sm font-medium">Approved by experts</p>
          <div className="flex items-center space-x-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <p className="pl-3 font-medium">4.1</p>
            <FaCopyright />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[178px]">
          <h5 className="text-normal font-medium">Review</h5>
        </div>
      </div>
    </div>
    ))}
    </>
  );
};

export default CasinoCard;

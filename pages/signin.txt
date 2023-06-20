import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/legacy/image";
import Slider from "../components/Slider";
import { useState } from "react";
import Imagelap from "../public/images/image-1.png";
import {
  FaPercentage,
  FaAngleDown,
  FaAngleRight,
  FaCreativeCommonsPdAlt,
  FaCcMastercard,
} from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { RiMailLine } from "react-icons/ri";
import { FcCurrencyExchange } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
import {
  AiFillLinkedin,
  AiOutlineCodepenCircle,
  AiOutlineExclamation,
} from "react-icons/ai";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import Bandits from "../components/Bandits";
import Lapilanders from "../components/BonusItem";
import Oakcasino from "../components/Oakcasino";
import { CgMenuLeft } from "react-icons/cg";

const Signin = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <Header />
      <div className="mx-4 text-sky-700 dark:text-white">
        <div className="py-6 px-1 mt-28">
          <div className="container mx-auto">
            <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
              <span>
                <a href="#">Online Casinos</a>
              </span>
              <FaAngleRight />
              <span>
                <a href="#">Reviews</a>
              </span>
              <FaAngleRight />
              <span className="text-slate-500">Planet 7 Casino</span>
            </div>
          </div>
        </div>
        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              Silver Oak Casino Review 2022
            </h1>
            <div className="flex flex-col py-4">
              <span className="">
                Author:{" "}
                <a href="" className="font-medium ">
                  Barry Bridges
                </a>
              </span>
              <span className="text-sky-600 dark:text-white">
                June 13, 2022
              </span>
            </div>
            <div className="bg-slate-100 dark:bg-gray-200 dark:text-black rounded-xl mt-3">
              <div className="card p-4">
                <div className="heading flex items-center border-b gap-7 pb-4">
                  <button className="w-10 h-7 rounded bg-sky-700 dark:bg-zinc-800"></button>
                  <h2 className="text-lg">
                    Why you can trust{" "}
                    <span className="font-bold">allfreechips.com</span>
                  </h2>
                  <a href="#">
                    <i className="bi bi-info-circle"></i>
                  </a>
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  volutpat elit vel tellus eleifend imperdiet. Donec consectetur
                  urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a
                  ex dignissim, scelerisque malesuada odio. Sed vestibulum
                  dictum eleifend.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex md:hidden justify-between bg-sky-700 px-4 py-2 items-center text-white dark:bg-white dark:text-black">
        <span className="font-medium">ON THIS PAGE</span>
        <span
          onClick={() => setShow(!show)}
          className="border-2 border-white dark:border-black p-2 flex items-center rounded px-4"
        >
          Jump to{" "}
          <CgMenuLeft className="text-white dark:text-black mx-2 text-xl" />
        </span>
      </div>
      <div
        className={`flex md:hidden flex-col w-full fixed p-4 rounded-t-2xl justify-between z-20 bg-white  text-2xl font-medium ${
          show ? "bottom-[-490px]" : "bottom-0"
        }`}
      >
        <div className="flex justify-between w-full items-center">
          <div>ON THIS PAGE</div>
          <div onClick={() => setShow(!show)} className="">
            <GrClose className="" />
          </div>
        </div>
        <hr className="border-1 my-4 border-sky-700" />
        <div className="flex flex-col font-normal text-lg space-x-2 space-y-4">
          <span className="font-medium border-l-2 px-4 border-sky-700">
            Our top picks
          </span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
        </div>
      </div>
      <div className="hidden md:w-1/4 md:flex md:flex-col dark:bg-zinc-800 md:">
        <span className="text-lg font-medium p-4">ON THIS PAGE</span>
        <hr className="border-sky-700 dark:border-white w-60" />
        <span className="my-4 px-4 border-l-4 font-medium border-sky-700 dark:border-white">
          Our top picks
        </span>
        <div className="my-4 flex flex-col space-y-4">
          <span>What is a LITECOIN casino</span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
          <span>What is a bitcoin casino</span>
        </div>
      </div>
    </div>
  );
};

export default Signin;

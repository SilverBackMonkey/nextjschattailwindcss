"use client"
import React from "react";
import Image from "next/image";
import { FaCaretSquareDown, FaCaretSquareUp } from "react-icons/fa";

import Check from "../assets/svgIcon/check.svg";
const Notice = () => {
  const [open, setOpen] = React.useState(false);

  const [openSubmenu, setOpenSubmenu] = React.useState({
    id: "",
    status: false,
  });
  return (
    <div className="flex flex-col bg-slate-100 dark:text-black pb-10  rounded-2xl md:flex-row md:justify-start font-normal scroll-mt-40">
      <div className="mx-6">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setOpen(open === true ? false : true)}
        >
          <div>
            {!open ? (
              <FaCaretSquareDown className="text-2xl md:text-3xl lg:text-4xl" />
            ) : (
              <FaCaretSquareUp className="text-2xl md:text-3xl lg:text-4xl" />
            )}
          </div>

          <div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold my-4 pl-8">
              How we select the top online casino bonuses for players
            </p>
          </div>
        </div>
        <hr className="w-1/3 mt-3 mb-4"></hr>

        <span className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          volutpat elit vel tellus eleifend imperdiet. Donec consectetur urna
          sed neque rhoncus dapibus. Aenean nunc erat, lobortis a ex dignissim,
          scelerisque malesuada odio. Sed vestibulum dictum eleifend.
        </span>
        {open ? (
          <>
            <div className="mt-6 flex ">
              <div className="pr-6">
                <Image src={Check} alt="" width={100} height={100} />
              </div>
              <div>
                <p className="font-bold mb-2s">Lorem ipsum dolor sit amet</p>
                <span>
                  dolor sit amet, consectetur adipiscing elit. Donec volutpat
                  elit vel tellus eleifend imperdiet. Donec consectetur urna sed
                  neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
                  dignissim, scelerisque malesuada odio. Sed vestibulum dictum
                  eleifend.
                </span>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="pr-6">
                <Image src={Check} alt="" width={100} height={100} />
              </div>
              <div>
                <p className="font-bold mb-2s">Lorem ipsum dolor sit amet</p>
                <span>
                  dolor sit amet, consectetur adipiscing elit. Donec volutpat
                  elit vel tellus eleifend imperdiet. Donec consectetur urna sed
                  neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
                  dignissim, scelerisque malesuada odio. Sed vestibulum dictum
                  eleifend.
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Notice;

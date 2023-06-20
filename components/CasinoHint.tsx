import React from "react";
import IconHint from "../assets/svgIcon/hint.svg";
import Image from "next/image";
const CasinoHint = () => {
  return (
    <div className="flex font-normal flex-col border  pl-1 shadow-md mb-8 ">
      <div className="flex border-s-4 border-l-4 border-[#0369a1] pt-8 pb-8 pl-6 pr-6">
        <div className="pr-8  ">
          <Image src={IconHint} alt={"hint"} width={200} height={200} />
        </div>
        <div>
          <p className="text-3xl font-semibold">
            5 reasons to use casino bonuses
          </p>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            volutpat elit vel tellus eleifend imperdiet. Donec consectetur urna
            sed neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
            dignissim, scelerisque malesuada odio. Sed vestibulum dictum
            eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec volutpat elit vel tellus eleifend imperdiet. Donec consectetur
            urna sed neque rhoncus dapibus
          </span>
        </div>
      </div>
    </div>
  );
};

export default CasinoHint;

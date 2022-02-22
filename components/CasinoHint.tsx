import React from "react";
import IconHint from "../assets/svgIcon/hint.svg";
import Image from "next/image";
const CasinoHint = ({ text, title }: { text: string; title: string }) => {
  if (text.length < 1){
    return null;
  }
  return (
    <div className="flex font-normal flex-col border  pl-1 shadow-md mb-8 ">
      <div className="flex border-s-4 border-l-4 border-[#0369a1] pt-8 pb-8 pl-6 pr-6">
        <div className="pr-8  ">
          <Image src={IconHint} alt={"hint"} width={200} height={200} />
        </div>
        <div>
          <p className="text-3xl font-semibold">{title}</p>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default CasinoHint;

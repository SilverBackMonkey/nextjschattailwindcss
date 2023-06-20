import React, { useState, useCallback } from "react";
import Link from "next/link";
import { BsFillStarFill, BsArrowRightCircleFill } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import Image from "next/image";

const defaultImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAHVJREFUKFNjrKura/j06RP/+/fvBT5+/CiATjP29/cXgCQ+fPjA/+HDBxCNghnnzp2b8OnTJ7BOZJNgChnXr18fAONgM4lx9+7dDl++fBF49+4dyAQMkxjPnz9vgG4vskmM9+/fV0BWgG4SI8hx2FwPEgOZBACHNbSCBLKzegAAAABJRU5ErkJggg==";

function LikeCasinoImage(props) {
  const [src, setSrc] = useState(
    `https://radiumpowered.com/radiumimages/homepage/${encodeURIComponent(
      props.clean_name
    )}-homescreen.jpg`
  );
  const onError = useCallback(() => {
    setSrc(defaultImage);
  }, []);
  return (
    <div className="w-full px-8">
      <Image
        src={src}
        width={384}
        height={240}
        className="w-full object-cover aspect-[16/10]"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAHVJREFUKFNjrKura/j06RP/+/fvBT5+/CiATjP29/cXgCQ+fPjA/+HDBxCNghnnzp2b8OnTJ7BOZJNgChnXr18fAONgM4lx9+7dDl++fBF49+4dyAQMkxjPnz9vgG4vskmM9+/fV0BWgG4SI8hx2FwPEgOZBACHNbSCBLKzegAAAABJRU5ErkJggg=="
        alt={props.casinoname}
        onError={onError}
      />
    </div>
  );
}

const LikeCasinos = (props) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
      {props.data.map((d) => (
        <div
          key={d.id}
          className="flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl"
        >
          <LikeCasinoImage
            clean_name={d.clean_name}
            casinoname={d.casinoname}
          />
          <span>{d.casino}</span>
          <span className="flex items-center">
            <BsFillStarFill />
            <BsFillStarFill />
            <BsFillStarFill />
            <VscStarEmpty />
            <VscStarEmpty />
            <span className="px-2">4.1</span>
          </span>
          <Link
            href={`https://allfreechips.com/play_casino${encodeURIComponent(
              d.id
            )}.html`}
            rel="noreferrer"
            target="_blank"
            type="button"
            className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center"
          >
            Play Now
            <BsArrowRightCircleFill className="mx-4" />
          </Link>
          <hr className="w-full border-sky-700 dark:border-white h-0.5" />
          <span>Deposit Bonus</span>
          <span>
            {d.depositPercent}% up to {d.currency} {d.depositBonus}
          </span>
          <hr className="w-full border-sky-700 dark:border-white h-0.5" />
          <span>No Deposit Bonus</span>
          <span>
            {d.ndcurrency}
            {d.nodeposit} {d.nodeposit_type}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LikeCasinos;

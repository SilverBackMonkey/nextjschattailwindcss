import React, { useEffect, useState, useCallback } from "react";
import Image from "next/legacy/image";
import Lapilanders from "../public/images/lapp.png";
import { useInterval } from "../hooks/use-interval";

function Slider() {
  const [index, setIndex] = useState(0);

  const images = [
    "./images/nitro.png",
    "./images/hytro.png",
    "./images/ritro.png",
    "./images/titro.png",
    "./images/mitro.png",
  ];

  const incr = useCallback(() => {
    [setIndex((v) => (v + 1) % images.length)];
  }, [setIndex, images.length]);

  useInterval(incr, 2000);

  return (
    <>
      <div className="flex flex-col justify-between space-x-4 mt-16">
        <div className="flex">
          <div className="flex">
            {/* <Image
              className="absolute w-72 pr-2 md:pr-0 mt-2 ml-7 md:w-96 md:mt-4 md:ml-10"
              src={images[index]}
              alt="new"
            /> */}
            <Image src={Lapilanders} width={470} height={280} alt="new" />
          </div>
        </div>
        {/* <div className="flex">
                        <button className="h-auto w-10 bg-yellow-800 font-extrabold text-3xl" onClick={handlePrev}>{"<"}</button>
                        <button className="h-auto w-10 bg-yellow-800 font-extrabold text-3xl" onClick={handleNext}>{">"}</button>
                    </div> */}
      </div>
    </>
  );
}
export default Slider;

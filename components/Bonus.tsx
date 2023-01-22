import Image from "next/legacy/image";
import {
  FaArrowCircleRight,
  FaChevronCircleDown,
  FaChevronCircleUp,
} from "react-icons/fa";

const Bonus = (data) => {
  const casinos = data.data;
  const bonusTerms =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat elit vel tellus eleifend imperdiet. Donec consectetur urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a ex dignissim, scelerisque malesuada odio. Sed vestibulum dictum eleifend.";
  return (
    <>
      {casinos.map((casino, id) => (
        <div key={id} className="  border-2 rounded-xl p-4  mb-4 ">
          <div className=" flex flex-col md:flex-row md:justify-evenly ">
            <div className="flex items-center md:flex-col">
              <Image
                unoptimized // avoids getting charged
                alt={casino.casino + " logo"}
                width={100}
                height={80}
                src={`https://www.allfreechips.com/image/casinoiconscut/${encodeURIComponent(
                  casino.button
                )}`}
              />
            </div>
            <div className="flex items-center justify-between px-4  md:flex-col">
              <span className="flex flex-col font-medium text-lg md:text-4xl md:px-4">
                {casino.ndcurrency} {" "}
                {casino.nodeposit}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                    <span className="md:text-lg">Free Spins{casino.fstext}</span>
                  </p>
                </div>
              </div>
            </div>
            <hr className="md:border md:h-20 border-sky-700 dark:border-white" />

            <div className="flex items-center justify-between px-4 md:flex-col">
              <span className="flex flex-col font-medium text-lg md:text-4xl md:px-4">
                {casino.currency} {" "}
                {casino.depositBonus}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                    <span className="md:text-lg">Bonus</span>
                  </p>
                </div>
              </div>
            </div>
            <hr className="md:border md:h-20 border-sky-700 dark:border-white" />
            <div className="flex items-center justify-between px-4 md:flex-col">
              <span className="flex flex-col font-medium text-lg md:text-4xl md:px-4">
                {casino.depositPlaythough}X
              </span>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                    <span className="md:text-lg">Playthrough</span>
                  </p>
                </div>
              </div>
            </div>
            <hr className="md:border md:h-20 border-sky-700 dark:border-white" />
            <div className="flex items-center justify-between px-4 md:flex-col">
              <span className="flex flex-col font-medium text-lg md:text-4xl md:px-4">
                Bonus
              </span>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                    <span className="md:text-lg">Details</span>
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
        </div>
      ))}
    </>
  );
};

export default Bonus;

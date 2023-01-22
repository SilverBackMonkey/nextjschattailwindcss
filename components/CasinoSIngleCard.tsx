import { FaStar, FaCopyright, FaArrowCircleRight } from "react-icons/fa";
import Image from "next/image";
const CasinoSingleCard = (data) => {
    const cardData = data.data
  return (
    

    <div className="flex flex-col lg:flex-row border-2 border-gray-300 p-6 rounded lg:p-12 lg:rounded-xl space-x-8">
      <span className="bg-sky-600 dark:bg-white rounded-t-lg text-white dark:text-black p-1 lg:hidden">
      {cardData.title}
      </span>
      <span><Image src={cardData.casinoImage} height={80} width={200} alt={cardData.name} /></span>
      <div className="flex flex-col py-4 lg:py-0 lg:pl-10">
        <div className="flex flex-col lg:flex-row lg:space-x-16">
          <h3 className="text-xl font-medium text-center mb-10 lg:mb-0">
            {cardData.title}
          </h3>
          <div className="flex items-center justify-between lg:space-x-2">
            <span className="hidden lg:block">Approved By Experts</span>
            <div className="flex items-center space-x-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <p className="pl-3">4.1</p>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-0">
              <p className="lg:hidden underline font-medium">{cardData.name} Review</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-end py-5 lg:space-x-32 ">
          <h5 className="font-medium lg:text-2xl">{cardData.bonusOneTittle}</h5>
          <div className="flex items-center space-x-4 lg:items-end">
            <span className="text-base mr-2l lg:text-5xl lg:font-medium">
            {cardData.bonusOneValueOne}
            </span>
            {cardData.bonusOneValueTwo}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-end py-5 lg:py-4 lg:space-x-20 ">
          <h5 className="font-medium lg:text-2xl">{cardData.bonusTwoTittle}</h5>
          <div className="flex items-center space-x-4 lg:items-end">
            <span className="text-base mr-2 lg:text-5xl lg:font-medium">
            {cardData.bonusTwoValue}
            </span>{" "}
            {cardData.bonusTwoValueTwo}
          </div>
        </div>
        <div className="flex flex-col">
          <button className="flex rounded bg-sky-700 text-white dark:bg-white dark:text-black py-3 my-4 justify-center items-center font-bold">
            Play Now
            <FaArrowCircleRight className="mx-2" />
          </button>
          <p className="text-xs font-medium">
          {cardData.casinoText}
          </p>
        </div>
      </div>
    </div>

  );
};

export default CasinoSingleCard;

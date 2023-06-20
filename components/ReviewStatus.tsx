import React from "react";

const ReviewStatus = () => {
  return (
    <div className=" bg-slate-100 dark:text-black m-2 p-6 rounded-2xl mt-4 mb-4 lg:pr-8 pl-8 md:pr-4 pl-4">
      <div className="grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <div className="flex justify-between  mb-4">
          <span>{"🔥Reels"}</span>

          <span>{"5"}</span>
        </div>
        <div className="flex justify-between  mb-4">
          <span>{"🎮Lines"}</span>
          <span>{"25"}</span>
        </div>
        <div className="flex justify-between  mb-4">
          <span>{"💰Bonus Multipliers"}</span>
          <span>{"No"}</span>
        </div>
        <div className="flex justify-between  mb-4">
          <span>{"💰Wild Symbols"}</span>
          <span>{"Yes"}</span>
        </div>
        <div className="flex justify-between  mb-4">
          <span>{"🔥Free Spins"}</span>
          <span>{"Yes"}</span>
        </div>
        <div className="flex justify-between  mb-4">
          <span>{"🎮Bonus Rounds"}</span>
          <span>{"25"}</span>
        </div>
        <div className="flex justify-between  mb-4">
          <span>{"🎮Scatters"}</span>
          <span>{"Yes"}</span>
        </div>
        <div className="flex justify-between  mb-4">
          <span>{"🔥Progressive"}</span>
          <span>{"Yes"}</span>
        </div>
        <div className="flex justify-between  mb-4">
          <span>{"💰Software"}</span>
          <span>{"RTG"}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewStatus;

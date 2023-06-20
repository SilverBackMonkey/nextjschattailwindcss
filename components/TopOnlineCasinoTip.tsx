import React from "react";

const TopOnlineCasinoTip = () => {
  return (
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
          Allfreechips is dedicated to bringing the best and latest online
          casino bonus information. We rely on your input to insure the casinos
          listed here are both correct and on the level by leaving your reviews.
        </p>
      </div>
    </div>
  );
};

export default TopOnlineCasinoTip;

"use client";

import "tw-elements/dist/css/tw-elements.min.css";

import { useEffect } from "react";

interface Props {
  options: any
}

const FilterSelect : React.FC<Props> = ({options}) => {
  useEffect(() => {
    const init = async () => {
      const { Select,  initTE } = await import("tw-elements");
      initTE({ Select });
    }
    init();
  }, []);

  return (
    <select 
        data-te-select-init
        data-te-select-filter="true"
        id="casinoGeoFilter"
        className="bg-gray-50 border border-gray-300 text-gray-300 rounded-lg focus:outline-none focus:border-current block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options?.length > 0 && options?.map((option: any, index: number) => 
          <option key={index} value={option}>
            { option }
          </option>
        )}
    </select>
  )
}

export default FilterSelect;
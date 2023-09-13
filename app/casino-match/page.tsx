import prisma from "@/client";
import CasinoFilter from "@/components/CasinoFilter";
import { Metadata } from "next";
import { getCasinosWithLocation, getFilterCondition, saveFilterCondition } from "../lib/FilterCasino";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Allfreechips Casino Match :: Find your next best online casino in seconds"
  const description = "Allfreechips Casino Match allows you to fine tune your likes about online casinos and delivers that news directly to you on one page."
  
  return {
    title: Title,
    description: description,
  };
}

export default async function Match () {

  let defaultCond = await getFilterCondition();
  return(
  <div>
      <div className="p-6">
        <CasinoFilter 
          defaultCondition={defaultCond}
          getCasinosWithLocation={getCasinosWithLocation} 
          saveFilterCondition={saveFilterCondition}
          // locationList={locationList}
          />
      </div>
      <div className="content" id="afc-main">
        <div className="md:container mx-auto text-sky-700 dark:text-white">
          {/* <CasinoFilter /> */}
        </div>
      </div>
  </div>);
}
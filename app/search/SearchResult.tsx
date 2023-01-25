
import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";
import ResultItems from "./ResultItems";
import { useEffect, useState } from 'react';
import { searchData } from "../lib/SearchFetch";

export default function SearchResult({searchkey, getData, getCount}) {
 
  return (
      <>
        <ResultItems type={1} searchkey={searchkey} getData={getData} getCount={getCount} category="Casino"/>
        <ResultItems type={2} searchkey={searchkey} getData={getData} getCount={getCount} category="Game"/>
      </>
  )
}
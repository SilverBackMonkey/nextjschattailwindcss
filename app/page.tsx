import Link from "next/link";
import prisma from "@/client";
import BonusFilter from "@/components/functions/bonusfilter";
import CasinoSingleCard from "@/components/CasinoSIngleCard";
import CasinoCard from "@/components/CasinoCard";
import Bonus from "@/components/Bonus";
import { GiTrophy } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import monthYear from "@/components/functions/monthYear";

import { Metadata } from "next";
import PlayButton from "@/components/PlayButton";
import { cookies } from "next/headers";
import { isAuthenticated } from "./lib/RegistEmail";
import LandingImage from "./components/LandingImage";
export const revalidate = 300;
export const dynamic = "error";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Best online casino bonus guide with " +
    monthYear() +
    " casino bonus codes";
  const description =
    monthYear() +
    " online casino bonus codes along with detailed no deposit casino bonuses for USA and world wide players";
  return {
    title: Title,
    description: description,
  };
}

export default async function page() {
  
  return (
          <LandingImage />
  );
}

import React from "react";
import Casino from "./Casino";
import Link from "next/link";
import { FaMedal } from "react-icons/fa";
import { GiUsaFlag } from "react-icons/gi";
import { SiBitcoinsv } from "react-icons/si";
import { RiGameFill } from "react-icons/ri";
import { BiNotepad } from "react-icons/bi";

const GridGuide = () => {
  return (
    <div className="md:px-24 py-8 text-center mt-2 p-2">
      <h2 className="text-3xl font-semibold px-8 md:text-6xl md:">
        Helping you find the right online casino
      </h2>
      <p className="py-6 font-medium md:text-xl md:my-10">
        Welcome to the 2023 version of the Allfreechips online casino guide. We will deliver the fastest access to online casios for both mobile and PC gamblers, not only very fast but the very best casinos of 2023.
      </p>
      <div className="grid grid-cols-2 md:grid md:grid-cols-3">
        <Link href="/best-casinos">
          <Casino
            icon={<FaMedal className="text-4xl" />}
            title={"Best Online Casinos"}
          />
        </Link>
        <Link href="/usa-casinos">
          <Casino
            icon={<GiUsaFlag className="text-4xl" />}
            title={"USA Online Casinos"}
          />
        </Link>
        <Link href="/bitcoin-casinos">
          <Casino
            icon={<SiBitcoinsv className="text-4xl" />}
            title={"Bitcoin USA Casinos"}
          />
        </Link>
        <Link href="/no-deposit-casinos">
          <Casino
            icon={<RiGameFill className="text-4xl" />}
            title={"No Deposit Casinos"}
          />
        </Link>
        <Link href="/free-spin-casinos">
          <Casino
            icon={<FaMedal className="text-4xl" />}
            title={"Free Spins Casinos"}
          />
        </Link>
        <Link href="/software">
          <Casino
            icon={<BiNotepad className="text-4xl" />}
            title={"Casinos by Software"}
          />
        </Link>
      </div>
    </div>
  );
};

export default GridGuide;

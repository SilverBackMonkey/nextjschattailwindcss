import React from "react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="flex flex-col p-4 md:flex-row md:justify-between md:container mx-auto">
      <span className="text-4xl font-medium">
        <Link href="/">
          <Image
            alt={"Allfreechips Casino Guide"}
            width={250}
            height={57}
            src={`https://afc-redux.vercel.app/logo.png`}
          />
        </Link>
      </span>
      <div className="flex space-x-6 md:flex-row md:space-x-28">
        <div className="flex flex-col">
          <div className="my-2 text-xl font-medium">
            Online Casinos
            <hr className="w-84 text-gray-600" />
          </div>
          <ul className="text-base font-medium">
            <li className="my-6">
              <Link href="/best-online-casinos">Best Online Casinos</Link>
            </li>
            <li className="my-6">
              <Link href="/new-casinos">New Online Casinos</Link>
            </li>
            <li className="my-6">
              <Link href="/usa-casinos">US Casinos</Link>
            </li>
            <li className="my-6">
              <Link href="/software/rtg">RTG Casinos</Link>
            </li>
            <li className="my-6">
              <Link href="/bitcoin-casinos">Bitcoin USA Casinos</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="my-2 text-xl font-medium">
            About
            <hr className="w-84 text-gray-600" />
          </div>
          <ul className="text-base font-medium">
            <li className="my-6"><Link href="/about">About Us</Link></li>
            <li className="my-6"><Link href="/chat">Discussions</Link></li>
            <li className="my-6">
            <Link href="/terms">Terms & Condition</Link>
            </li>
            <li className="my-6"><Link href="/scratch-cards">Free Scratch Cards</Link></li>
            <li className="my-6">AFC Dice Game</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

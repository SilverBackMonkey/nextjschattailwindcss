import React from 'react';
import { _avg } from '../lib/Aggregation';
import Image from 'next/legacy/image';
import { BsArrowRightCircleFill, BsFillStarFill } from 'react-icons/bs';
import { VscStarEmpty } from 'react-icons/vsc';
import { AiOutlineExclamation } from 'react-icons/ai';
import Link from 'next/link';

export default function CasinoContent({casino}) {
    const firstBonus = casino.bonuses.find((v) => v.deposit > 0);
    const data = casino;


    const myRating = _avg(data.casino_ratings);
    const casinoLink =
        "https://www.allfreechips.com/play_casino" + data.id + ".html";
    const Homepage =
        "https://www.allfreechips.com/image/games/" + data.homepageimage;
    return (
        <div className="border-2 rounded-xl flex flex-col md:flex-row items-center md:space-x-16 px-6 py-2 my-2 hover:shadow-lg">
            <Link
                rel="noreferrer"
                target="_blank"
                href={casinoLink}
                className="rounded-lg items-center"
                >
                <Image
                    src={Homepage}
                    unoptimized
                    width={440}
                    height={300}
                    alt={data.homepageimage}
                    className="hover:scale-105 duration-300 rounded-xl"
                    />
            </Link>
            <div className="flex flex-col w-full py-8">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="text-3xl font-medium items-center w-full">
                    {data.casino}
                    </div>
                    <div className="flex w-full justify-between md:justify-start my-4">
                    <div className="flex items-center space-x-2">
                        <span className="flex">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <div key={value}>
                            {myRating >= value && <BsFillStarFill />}
                            {myRating < value && <VscStarEmpty />}
                            </div>
                        ))}
                        </span>
                        <span>{myRating}</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className="flex items-center">Review</span>
                        <span className="h-9 w-9 rounded-full bg-sky-700 text-white dark:bg-zinc-800 dark:text-white">
                            <AiOutlineExclamation className="relative top-2 left-2" />
                        </span>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-center md:flex-row">
                    <div>Top Offer</div>
                    <div className="flex items-center">
                    <span className="text-5xl">{firstBonus?.deposit} </span>
                    <div className="flex flex-col space-y-0 leading-4 text-base">
                        <span>
                        %
                        {(
                            (firstBonus?.deposit /
                            (firstBonus?.deposit_amount || 1)) *
                            100
                        ).toFixed(0)}
                        </span>
                        <span>Bonus</span>
                    </div>
                    </div>
                    <div className="font-normal">
                    up to ${firstBonus?.deposit_amount}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-8">
                    <div className="flex items-center mt-4 w-full">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl">$10</span>
                        <span className="text-sm font-light">Min. Deposit</span>
                    </div>
                    <hr className="border-sky-200 w-10 h-1 rotate-90" />
                    <div className="flex flex-col items-center">
                        <span className="text-2xl">{firstBonus?.playthrough}</span>
                        <span className="text-sm font-light">Playthrough</span>
                    </div>
                    <hr className="border-sky-200 w-10 h-1 rotate-90" />
                    <div className="flex flex-col items-center">
                        <span className="text-sm">Bonus</span>
                        <span className="text-sm">details</span>
                    </div>
                    </div>

                    <Link
                    rel="noreferrer"
                    target="_blank"
                    href={casinoLink}
                    type="button"
                    className="bg-sky-700 text-white dark:text-white dark:bg-zinc-800 flex w-full justify-center rounded-lg items-center h-14"
                    >
                    Claim Now
                    <BsArrowRightCircleFill className="mx-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

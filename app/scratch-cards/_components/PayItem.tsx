import React from 'react';
import { activePrizeChipStyle } from '../shared';
import Image from 'next/image';

interface Props {
    text: string,
    avatar: string,
    isFreePlay: boolean,
    lastOutcome: any,
}

const PayItem: React.FC<Props>= ({text, avatar, isFreePlay, lastOutcome}) => {
    return (
        <div
            className={`border-spacing-1 p-1 rounded-lg justify-items-center items-center flex flex-col ${
            !isFreePlay &&
            lastOutcome?.prize === avatar
                ? "bg-slate-300"
                : ""
            }`}
        >
            <h1 className="font-bold text-md" style={{color:"#ffeaea"}}>{text}</h1>
            <div className="flex">
            {[1, 2, 3].map((v) => (
                <Image
                key={`25usd-${v}`}
                className="mx-1"
                height={40}
                width={40}
                src={avatar}
                alt="$25 USD"
                />
            ))}
            </div>
        </div>
    );
}

export default PayItem;
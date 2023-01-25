import React, { useState } from 'react';
import Casino from '../../components/SoftBox';
import { useEffect } from 'react';
import { title } from 'process';

interface props {
    type: number,
    item: any
}

const ResultItem: React.FC<props> = ({type, item}) =>{
    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [src, setSrc] = useState('');
    
    useEffect(() => {
        debugger;
        if(type ==1 ){
            setName('casino');
            setImgUrl('clean_name');
            setSrc("button");
        }
        else if(type == 2) {
            setName('game_name');
            setImgUrl('game_clean_name');
            setSrc("game_image");
        }
        else
            setName('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    return (
    <div className="relative mx-auto w-full max-w-sm pt-2">
        {type == 1 && <a href={`/review/${item[imgUrl]}`} className="relative inline-block w-full transform transition-transform duration-300 ease-in-out">
            <div className="rounded-lg">
                <div className="relative flex h-30 justify-center overflow-hidden rounded-t-lg">
                    <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                        {item?.button && 
                        <picture>
                            <img src={`https://www.allfreechips.com/image/casinoiconscut/${item?.button}`} width={400} alt={item?.casino} />
                        </picture>}
                        {
                        !item?.button && 
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`/${type}.png`} alt={item?.casino} />
                        }
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        {item?.meta && item?.meta[0]?.title && <h2 className="text-base font-medium text-gray-800 md:text-lg" title="New York">{item?.meta[0]?.title}</h2>}
                        <p className="mt-2 line-clamp-1 text-sm text-gray-800" title="New York, NY 10004, United States">{item[name]}</p>
                    </div>
                </div>
            </div>
        </a>}
        {type == 2 && <a href={`/slot/${item[imgUrl]}`} className="relative inline-block w-full transform transition-transform duration-300 ease-in-out">
            <div className="rounded-lg">
                <div className="relative flex h-30 justify-center overflow-hidden rounded-t-lg">
                    <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                        {item?.game_image && 
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`https://www.allfreechips.com/image/sloticonssquare/${item?.game_image}`} alt={item?.casino} />}
                        {!item?.game_image && 
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/${type}.png`} alt={item?.casino} />}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        {item?.meta && item?.meta[0]?.title && <h2 className="text-base font-medium text-gray-800 md:text-lg" title="New York">{item?.meta[0]?.title}</h2>}
                    <p className="mt-2 line-clamp-1 text-sm text-gray-800" title="New York, NY 10004, United States">{item[name]}</p>

                    </div>
                </div>
            </div>
        </a>}
    </div>
  );
}

export default ResultItem;
/* eslint-disable @next/next/no-img-element */
import { DeleteIcon, EditIcon } from '@/app/chat/_lib/ChatData';
import Modal from '@/components/Modal';
import React from 'react';
import { title } from 'process';

interface Props {
    item: any, 
    userRole: any,
    dModalShow: (news: any) => void,
    uModalShow: (news: any) => void
}
const NewsItem: React.FC<Props> = ({item, userRole, dModalShow, uModalShow}) => {
    
    return (
        <div className="flex flex-col items-center gap-x-8 rounded-xl border bg-white p-3 md:flex-row">
            <div className="shrink-0">
            <a href={`/news/${item?.id}`}>
                <img className="h-36 w-48 hover:translate-y-1 duration-300" src={item?.image} alt="Project Web Design" loading="lazy" />
            </a></div>
            <div className='w-full'>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <a className="hover:text-cyan-400" href={`/news/${item?.id}`}>
                        <h1 className="mb-6 text-2xl font-bold line-clamp-1" style={{overflowWrap: "anywhere"}}>{item?.title}</h1>
                    </a>
                </div>
                {(userRole == 1 || userRole == 3) && <div className="flex items-center mb-2">
                    <button 
                        onClick={() => uModalShow(item)}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <EditIcon />
                    </button>
                    <button 
                        onClick={() => dModalShow(item)}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <DeleteIcon />
                    </button>
                </div>}
            </div>
            <p className="mt-3 text-semibold line-clamp-2" style={{overflowWrap: "anywhere"}}>{item?.description}</p>
            </div>

        </div>
    );
}

export default NewsItem;
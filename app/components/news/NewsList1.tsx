"use client";

import React, {lazy, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import NewsEdit from './NewsEdit'
import RecentNews from './RecentNews';
const factoryUpdateModal = () => import('./UpdateNewsModal');
const UpdateNewsModal = lazy(factoryUpdateModal);
const factoryModal = () => import('@/components/Modal');
const CustomModal = lazy(factoryModal);
interface props {
    news: any,
    userRole: any,
    categories: any,
    total: number,
    recentNews: any,
    addNews: (news: any) => any,
    getNews: (category: any, pageNum?:number) => any,
    updateNews:(news: any) => void,
    removeNews: (newsId: any) => void,
}

const NewsList1:React.FC<props> = ({news, total, categories, recentNews, userRole, addNews, getNews, updateNews, removeNews}) => {
    
    const [optimisticNews, setOptimisticNews] = useState(news);
    const [pageNum, setPageNum] = useState(0);
    const [category, setCategory] = useState(0);
    const [totalCount, setTotalCount] = useState(total);
    const [topNews, setTopNews] = useState(recentNews);
    const [item, setItem] = useState<any>();
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    // const categoryStyles = [
    //     'bg-lime-400 text-lime-900',
    //     'bg-sky-400 text-sky-900',
    //     'bg-rose-400 text-rose-900'
    // ]

    const addOptimisticNews = (data: any) => {
        data = {...data, sending: true};
        let updatedNews = optimisticNews;
        updatedNews.unshift(data);
        setOptimisticNews(updatedNews);
    }

    const modifyOptimisticNews = (data: any) => {
        ;
        let updatedNews = optimisticNews.map(mes => {
            if (mes.id === data['id']){
                return data;
            }
            return mes;
        })

        setOptimisticNews(updatedNews);
    }

    const submitNewNews = async (data: any) => {
        console.log(category);
        console.log("this is data");
        console.log(data);
        if(data.category == category || category == 0){
            addOptimisticNews(data);
        }
        let currentTopNews = topNews;
        
        const result = await addNews(data);

        if(result?.id) {
            modifyOptimisticNews(result);
            currentTopNews.unshift(result);
            let addedTopNews = currentTopNews.slice(0,4);
            setTopNews(addedTopNews);
            return true;
        }
        return false;
    }

    useEffect(() => {
        
    }, [])
    useEffect(() => {
        factoryModal();
    },[deleteModalShow]);
    const changeCategory = async (catId:any) => {
        ;
        if(category === catId)
            return;
        const newList = await getNews(catId, 0);
        ;
        setOptimisticNews(newList?.result);
        setTotalCount(newList?.total);
        setPageNum(0);
        setCategory(catId);
    }
    
    const readMore = async () => {
        let pgNum = pageNum + 1;
        ;
        const newList = await getNews(category, pgNum);
        if(!newList.result || newList?.result?.length == 0 )
            return;

        let originList = optimisticNews;
        newList.result?.map((item:any) => {
            originList.push(item);
        })
        setOptimisticNews(originList);  
        setPageNum(pgNum);
    }

    const dModalShow = (deleteItem: any) => {
        setItem(deleteItem);
        setDeleteModalShow(true);
    }

    const deleteNews = () => {
        let updatedNews = optimisticNews.filter(nItem => nItem.id != item?.id);
        setOptimisticNews(updatedNews);
        let tempCount = totalCount;
        setTotalCount(tempCount - 1);
        removeNews(item);
    }

    const uModalShow = (updateItem: any) => {
        ;

        setItem(updateItem);
        setEditModalShow(true);
    }

    const editNews = async (item: any) => {
        ;
        modifyOptimisticNews(item);
        let result: any = await updateNews(item);
        return result;
    }

    return (
        <div className="mx-auto max-w-screen-lg px-3 py-6">
            {userRole && (userRole == 1 || userRole == 3) && <NewsEdit addNews={submitNewNews} categories={categories}/>}

            <h1 className="text-3xl font-bold mb-6 flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                </svg>
                &nbsp;&nbsp;News
                {/* <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">&nbsp;by category</span>  */}
            </h1>
            {/* <div className="ml-3 flex gap-2 mb-6">
                <div 
                    onClick={(e:any)=> {
                        e.preventDefault();
                        changeCategory(0);
                    }}
                    className={`w-24 h-8 text-center cursor-pointer rounded-md px-2 py-1 text-md font-semibold bg-fuchsia-400 text-fuchsia-900`}>
                        All
                </div>
                {categories && categories.length > 0 && categories.map((cat: any, index: number)=>
                    <div 
                        key={cat?.id} 
                        onClick={(e:any)=> {
                            e.preventDefault();
                            changeCategory(cat.id);
                        }}
                        className={`w-24 h-8 text-center cursor-pointer rounded-md px-2 py-1 text-md font-semibold ${categoryStyles[index]}`}>
                            {cat?.value}
                    </div>
                )}
            </div> */}
            <div className="flex flex-col gap-6 pb-6">
                {/* {optimisticNews && optimisticNews.length > 0 && optimisticNews.map((item: any, index: number) =>  */}
                    {/* // <NewsItem key={index} item={item} dModalShow={dModalShow} uModalShow={uModalShow} userRole={userRole}/> */}
                {/* )} */}
                {!optimisticNews || optimisticNews.length === 0 && 
                    <div className="px-3 pt-2 pb-6 text-center">
                        <h2 className="text-xl font-semibold">There are no News!!!</h2>
                    </div>
                }
            </div>
            {totalCount > optimisticNews.length && <div className="flex items-center justify-center py-4">
                <button 
                     onClick={readMore}
                    className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center mr-2 cursor-pointer" >
                        Read More →
                </button>
            </div>}
            <CustomModal title='Danger Alert!' show={deleteModalShow} setShow={setDeleteModalShow} type="warning" submit={deleteNews} >
                <p>Remove this News?</p>
            </CustomModal>
            <UpdateNewsModal item={item} categories={categories} show={editModalShow} setShow={setEditModalShow} submit={editNews}/>
        </div>
    )
}

export default NewsList1;

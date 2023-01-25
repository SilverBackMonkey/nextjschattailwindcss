"use client";

import React, { useEffect, useState } from 'react';
import { SendMessageIcon } from '../chat/_lib/ChatData';
import { Comments } from '.prisma/client';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
    user: any,
    type: number,
    parent: number,
    addComment: (comment:any) => any,
    getComment: (type: number, parent: number) => any,
    getCountComment: (type:number, parent: number) => any
}
const Comment: React.FC<Props> = ({user, type, parent, addComment, getComment, getCountComment}) =>  {
    const authorId = user?.id;

    const [content, setContent] = useState('');
    const [count, setCount] = useState(3);
    const [total, setTotal] = useState(0);
    const [optimisticComments, setOptimisticComments] = useState<any[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getTotal() {
            try{
                const totalcount = await getCountComment(type, parent);
                setTotal(totalcount);
                if(totalcount > count) {
                    setShowMore(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        async function fetchComments() {
            try{
                const initComments = await getComment(type, parent);
                setOptimisticComments(initComments);
                setLoading(false);
                } catch (error) {
                    console.error(error);
                }
            }
        
        getTotal();
        fetchComments();
        const intervalId = setInterval(() => {
            fetchComments();
            getTotal();
          }, 100000); // Fetch every 100 seconds
        
          // Return a cleanup function to clear the interval when the component unmounts
          return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickShowOrHide = () => {
        if(showMore) {
            setCount(total);
        }
        else{
            setCount(3);
        }
        setShowMore(!showMore);
    }

    const ShowMoreButton = () => {
        if(total > 3) {
            if(showMore)
                return <button onClick={clickShowOrHide} className={`bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center `}>
                    Show More
                </button>
            else 
                return <button onClick={clickShowOrHide} className={`bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center`}>
                    Show Less
                </button>
        }
        else {
            return <>
            </>
        }
    }

    const addOptimisticComment = (comment: any) => {
        comment = {...comment, sending: true};
        let updatedComments = optimisticComments;
        updatedComments.unshift(comment);
        setOptimisticComments(updatedComments);
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setContent(value);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if(content && content != ''){
            let comment = {type: type, parent: parent, content: content, authorId: authorId, createdAt: new Date()};
            setTotal(total + 1);
            if(count > 3) 
                setCount(count + 1);
            addOptimisticComment(comment)

            let addedComment = await addComment(comment);
 
            if(addedComment.id) {
                let updatedMessages = optimisticComments.map(com => {
                    if(com?.sending) {
                        return addedComment;
                    }
                    else{
                        return com;
                    }
                })
                setOptimisticComments(updatedMessages);
            }
            else {
                optimisticComments.shift();
                setTotal(total-1);
                setCount(count-1);
            }
        }

        setContent('');
    }

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({loading ? '...' : total})</h2>
            </div>

            { user && <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea 
                        id="comment" 
                        rows={3} 
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" 
                        onChange={handleInputChange} 
                        placeholder="Write a comment..." 
                        value={content}
                        required={true}></textarea>
                </div>
                <div className="md:ml-4 sm:ml-2 mt-3">
                    <button 
                    className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center" 
                    onClick={submitForm}>
                      <span>Send</span>
                      <span className="ml-2">
                        <SendMessageIcon />
                      </span>
                    </button>
                  </div>
            </form>}
            
            {!loading && optimisticComments && optimisticComments.length > 0 && optimisticComments.slice(0,count).map(comment => 
              <article key={comment?.createdAt.toLocaleString()} className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                            <picture>
                                <img className="mr-2 w-6 h-6 rounded-full" src={comment?.author?.image} alt={comment?.author?.name} />
                            </picture>
                            {comment?.author?.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{comment?.createdAt.toLocaleString()}</p>
                    </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{comment?.content}</p>
            </article>
            )}
            
            {!loading && <ShowMoreButton />}
            
        </div>
    );
}

export default Comment;
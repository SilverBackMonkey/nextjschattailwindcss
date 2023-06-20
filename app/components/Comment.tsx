"use client";

import React, { useEffect, useState } from 'react';
import { SendMessageIcon } from '../chat/_lib/ChatData';
import { Comments } from '.prisma/client';

interface Props {
    user: any,
    type: number,
    parent: number,
    addComment: (comment) => void,
    getComment: (type: number, parent: number, count: number ) => any,
}
const Comment: React.FC<Props> = ({user, type, parent, addComment, getComment}) =>  {
    const authorId = user.id;
    const [canRate, setCanRate] = useState(false);
    const [content, setContent] = useState('');
    const [optimisticComments, setOptimisticComments] = useState<any[]>([]);
    
    useEffect(() => {
        async function fetchMessages() {
            try {
              const initComments = await getComment(type, parent, 3);
              setOptimisticComments(initComments);
            } catch (error) {
              console.error(error);
            }
          }
        
          fetchMessages();
          const intervalId = setInterval(() => {
            fetchMessages();
          }, 5000); // Fetch every 5 seconds
        
          // Return a cleanup function to clear the interval when the component unmounts
          return () => clearInterval(intervalId);
    }, [])
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

    const submitForm = async () => {
        if(content && content != ''){
            debugger;
            let comment = {type: type, parent: parent, content: content, authorId: authorId, createdAt: new Date()};

            // addOptimisticComment(comment)
            
            const addedComment : any = await addComment(comment);
        }
    }
    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({optimisticComments.length})</h2>
            </div>
            {user && <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea 
                        id="comment" 
                        rows={4} 
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" 
                        onChange={handleInputChange} 
                        placeholder="Write a comment..." 
                        value={content}
                        required={true}></textarea>
                </div>
                <div className="md:ml-4 sm:ml-2 mt-3">
                    <button 
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" 
                    onClick={submitForm}>
                      <span>Send</span>
                      <span className="ml-2">
                        <SendMessageIcon />
                      </span>
                    </button>
                  </div>
            </form>}
            {optimisticComments && optimisticComments.map(comment => 
              <article key={comment?.createdAt?.toLocaleString()} className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img className="mr-2 w-6 h-6 rounded-full" src={comment?.author?.image} alt={comment?.author?.name} />{comment?.author?.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{comment?.createdAt.toLocaleString()}</p>
                    </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{comment?.content}</p>
                <div className="flex items-center mt-4 md:space-x-2 sm:space-x-1">
                    <button type="button" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 63,30 90,35 70,55 75,82 50,70 25,82 30,55 10,35 37,30" fill="yellow"/>
                        </svg>
                    </button>
                    <button type="button" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 63,30 90,35 70,55 75,82 50,70 25,82 30,55 10,35 37,30" fill="yellow"/>
                        </svg>
                    </button>
                    <button type="button" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 63,30 90,35 70,55 75,82 50,70 25,82 30,55 10,35 37,30" fill="yellow"/>
                        </svg>
                    </button>
                    <button type="button" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 63,30 90,35 70,55 75,82 50,70 25,82 30,55 10,35 37,30" fill="yellow"/>
                        </svg>
                    </button>
                    <button type="button" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 63,30 90,35 70,55 75,82 50,70 25,82 30,55 10,35 37,30" fill="yellow"/>
                        </svg>
                    </button>
                </div>
            </article>
            )}
            
        </div>
    );
}

export default Comment;
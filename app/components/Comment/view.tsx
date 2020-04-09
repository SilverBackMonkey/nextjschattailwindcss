"use client";

import React, { useEffect, useState } from "react";
import { SendMessageIcon } from "../../chat/_lib/ChatData";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  type: number;
  parent: number;
  addComment: (comment: any) => any;
  comments: any;
  totalCount: any;
}
export const CommentView: React.FC<Props> = ({
  type,
  parent,
  addComment,
  comments,
  totalCount,
}) => {

  const { data: session, status } = useSession();

  const user:any = session?.user;
  const [content, setContent] = useState("");
  const [count, setCount] = useState(3);
  const [total, setTotal] = useState(0);
  const [optimisticComments, setOptimisticComments] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    function fetchComments() {
      try {
        setOptimisticComments(comments);
        setTotal(totalCount);
        if(totalCount > 3) 
          setShowMore(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComments();
    const intervalId = setInterval(() => {
      fetchComments();
    }, 100000); // Fetch every 100 seconds

    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickShowOrHide = () => {
    if (showMore) {
      setCount(total);
    } else {
      setCount(3);
    }
    setShowMore(!showMore);
  };

  const ShowMoreButton = () => {
    if (total > 3) {
        return (
          <button
            onClick={clickShowOrHide}
            className={`bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center `}
          >
            {showMore?'Show More':'Show Less'}
          </button>
        );
      
    } else {
      return <></>;
    }
  };

  const addOptimisticComment = (comment: any) => {
    comment = { ...comment, sending: true };
    let updatedComments = optimisticComments;
    updatedComments.unshift(comment);
    setOptimisticComments(updatedComments);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (content && content != "") {
      let comment = {
        type: type,
        parent: parent,
        content: content,
        author: {
          name: user.name,
          image: user.image
        },
        createdAt: new Date(),
      };
      setTotal(total + 1);
      if (count > 3) setCount(count + 1);
      addOptimisticComment(comment);

      let addedComment = await addComment(comment);

      if (addedComment?.id) {
        let updatedMessages = optimisticComments.map((com) => {
          if (com?.sending) {
            return addedComment;
          } else {
            return com;
          }
        });
        setOptimisticComments(updatedMessages);
      } else {
        optimisticComments.shift();
        setTotal(total - 1);
        setCount(count - 1);
      }
    }
    setContent("");

  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion ({loading ? "..." : total})
        </h2>
      </div>

      {user && (
        <form className="mb-6">
          <textarea
            id="comment"
            rows={3}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md mt-6 text-lg focus:outline-none focus:border-current dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            onChange={handleInputChange}
            placeholder="Write a comment..."
            value={content}
            required={true}
          ></textarea>
          <div className="md:ml-4 sm:ml-2 mt-3">
            <button
              className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center"
              onClick={submitForm}
            >
              <span>Send</span>
              <span className="ml-2">
                <SendMessageIcon />
              </span>
            </button>
          </div>
        </form>
      )}

      {!loading &&
        optimisticComments &&
        optimisticComments.length > 0 &&
        optimisticComments.slice(0, count).map((comment) => (
          <article
            key={comment?.createdAt.toLocaleString()}
            className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <picture>
                  {comment?.author?.image && <Image className="mr-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full" src={user?.image} alt={user?.name? user.name: 'No Avatar'} />}
                  {!comment?.author?.image && 
                      <span className="rounded-full bg-yellow-500 text-white mr-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 flex items-center justify-center">
                          {comment?.author?.name}
                      </span>}
                  </picture>
                  {comment?.author?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {comment?.createdAt.toLocaleString()}
                </p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">
              {comment?.content}
            </p>
          </article>
        ))}

      {!loading && <ShowMoreButton />}
    </div>
  );
};

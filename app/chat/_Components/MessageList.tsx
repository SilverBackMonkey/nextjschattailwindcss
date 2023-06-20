'use client';
import {lazy, useEffect, useState} from 'react';
import { DeleteIcon, EditIcon, NoAvartar, replaceEmoticons} from "../_lib/ChatData";
import { sendMessage } from '../_lib/functions';
import ShoutBox from './ShoutBox';
import LikeButton from './LikeButton';
const factoryDeleteModal = () => import('./CommentDeleteModal');
const CommentDeleteModal = lazy(factoryDeleteModal);
const factoryEditModal = () => import('./CommentEditModal');
const CommentEditModal = lazy(factoryEditModal);

interface props {
    user: any,
    getMessages: () => any,
    like: (message: any) => void,
    updateMessage: (message: any) => Promise<void>,
    removeMessage: (messageId: string) => any,
    sendMessage: (message: any) => any
}

const MessageList: React.FC<props> = ({user, getMessages, like, updateMessage, removeMessage, sendMessage}) => {
    const myId = user?.id;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [message, setMessage] = useState(null);
    // const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [optimisticMessages, setOptimisticMessages] = useState<any[]>([]);
    const [initLoading, setInitLoading] = useState(true);
    
    useEffect(() => {
        async function fetchMessages() {
            try {
              const initMessages = await getMessages();
              setOptimisticMessages(initMessages);
              setInitLoading(false);
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

    const likeMessage = async (message) => {
        await like(message);
        
        modifyOptimisticMessage(message);
    }

    const addOptimisticMessage = (message: any) => {
        message = {...message, sending: true};
        let updatedMessages = optimisticMessages;   
        updatedMessages.unshift(message);
        setOptimisticMessages(updatedMessages);
    }

    const modifyOptimisticMessage = (message: any) => {
        let updatedMessages = optimisticMessages.map(mes => {
            if (mes.id === message['id']){
                return message;
            }
            return mes;
        })
        setOptimisticMessages(updatedMessages);
    }

    const sendNewMessage = async (event: any) => {
        const message = event.message?.toString() ?? "";
        addOptimisticMessage(message);
        const result = await sendMessage(message);
        if (result.id) {
            let updatedMessages = optimisticMessages.map(message => {
                if(message?.sending) {
                    return result;
                }
                else{
                    return message;
                }
            })
            setOptimisticMessages(updatedMessages);
        }
        else {
            return;
        }
    }
    // import MessageDeleteModal
    useEffect(() => {
        factoryDeleteModal();
      },[showModalDelete]);
      
    // import MessageEditModal
    useEffect(() => {
        factoryEditModal();
      },[showEditModal]);
    
    const showModalEdit = (message:any) => {
        setMessage(message);
        setShowEditModal(true);
    }

    const dModalShow = (message) => {
        setMessage(message);
        setShowModalDelete(true);
    }

    const deleteMessage = (message: any) => {
        setLoading(true);
        let updatedMessages = optimisticMessages.filter(mes => mes.id != message.id);
        setOptimisticMessages(updatedMessages);            
        const res = removeMessage(message?.id);
        setLoading(false);
    }

    const editMesssage = (message: any) => {
        
        modifyOptimisticMessage(message);
        
        updateMessage(message);
    }
    const renderMessages =  optimisticMessages && optimisticMessages.length > 0  && optimisticMessages.map((message) => {
        if(message?.sending == true ) {
            return <div key={new Date() + 'sending...'} className="flex items-center justify-between">
            <div>
                <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        }
        else {
        let createdAt = message?.createdAt.toLocaleString();

        let role = user?.role;

        let text = message?.message;
        const replacedText = replaceEmoticons(text);

        const messageToolButtons = (message: any, role: number) =>  {
        // function messageToolButtons(message: any)  {
            let liked:boolean = message.isLiked;

            const likes = <>
                <LikeButton likeMessage={likeMessage} message={message} liked={liked} myId={myId}/>   
            </>
            
            if (role == 0 || role == 2 || (role == 1 && message?.userId == myId)) {
            // if (message?.author.id == myId) {
            return <div className="flex items-center">
                {likes}
                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    onClick={() =>showModalEdit(message)} type="button">
                        <EditIcon />
                </button>
                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    onClick={() => dModalShow(message)} type="button">
                    <DeleteIcon />
                </button>
            </div>
            }
            else return  <div className="flex items-center">
                {likes}
            </div>
        }

        return (
            <div key={message?.id} role="status" className="max-w-sm p-0 border border-gray-200 rounded-lg shadow md:p-6 dark:border-gray-700">
                <article className="p-0 mb-2 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                            {message?.userImage && 
                                <img className="mr-2 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full" src={message?.userImage} alt={message?.username}  />
                            }
                            {!message?.userImage &&
                                <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <NoAvartar />             
                                </div>
                            }
                            </div>
                            <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                            {message?.username} 
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 ">{createdAt}</p>
                        </div>
                        
                        {messageToolButtons(message, role)}
                        {/* {messageToolButtons(message)} */}
                    </footer>
                    <div className="px-16 w-11/12">
                        <label className=" text-gray-500 dark:text-gray-400" style={{wordWrap: "break-word"}}>{replacedText}</label>
                    </div>
                    </article>
            </div>
        
    )}
});

    const renderNullMessages = (
        <>
        {(loading || initLoading) ? (<></>) : (<h2>
                Sorry, there is no message.
            </h2>)}
        </>
    )
    const loadingSkeleton = <>        
        <div role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div>
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </>
    const messageRender =
    <>
        {initLoading && 
            loadingSkeleton
        }
        {!initLoading && optimisticMessages && optimisticMessages.length > 0 ? renderMessages: renderNullMessages}
        {message && 
            <>
                <CommentEditModal message={message} show={showEditModal} setShow={setShowEditModal} saveMessage={editMesssage}/>
                <CommentDeleteModal message={message} show={showModalDelete} setShow={setShowModalDelete} removeMessage={deleteMessage}/>
            </>}
    </>

    return <div className="md:w-10/12 sm:w-full mx-auto px-4">

    {user && user.id && <ShoutBox sendMessage={sendNewMessage} loading={loading} />}

    <div className="max-h-200 h-200 overflow-y-auto">
        <div className="flex flex-col space-y-2">
            {/* {!loading &&  */}
                {messageRender}
            {/* // }
            // {loading && loadingSkeleton} */}
        </div>
    </div>
    </div>
}

export default MessageList;
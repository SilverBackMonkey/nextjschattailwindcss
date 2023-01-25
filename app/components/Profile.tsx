"use client";
import React from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import {useState, useEffect} from 'react';
import { prev } from 'cheerio/lib/api/traversing';

interface props {
    user: any,
    addUsername: (email: any, username: any, avatar: any) => Promise<boolean>
}

const Profile: React.FC<props> = ({user, addUsername}) => {
    const [adding, setAdding] = useState(false);
    const [name, setName] = useState(user?.name);
    const [selectedFile, setSelectedFile] = useState<any>()
    const [err, setErr] = useState(false);
    const [imageError, setImageErr] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(user?.image) {
            setSelectedFile(user.image);
        }
        //not login state
        if(!user || !user.email) 
            redirect('/')
        //login and have username      
    }, [user])

    const onSelectFile = ev => {
        let files = ev.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        const maxSize = 1024* 1024;

        if(files[0]?.size > maxSize) {
            setImageErr(true);
            return;
        }
        setImageErr(false);
        reader.onload = (e) => {
            setSelectedFile(e.target?.result);
        }
    }
    
    const changeVal = (e) => {
        setName(e?.target?.value)
        if(e.target.value !== '')
            setErr(false);
        else    
            setErr(true);
    }
    
    const checkError = () => {
        if(name === '' ) {
            setErr(true);
            return true;
        }
        else {
            setErr(false);
            return false;
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        let added = false;
        if(!checkError()) {
            setAdding(true);
            added = await addUsername(user.email, name, selectedFile);
            if(added) {
                router.refresh();
                router.push('/');
            }
            setAdding(false);
        }
    }
    return (
        <div className="flex justify-center bg-gray-100 pb-4">
            <div className="container sm:mt-2 mt-4 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
                <div className="text-center my-6">
                    <h1 className="text-3xl font-semibold text-current">Your Profile</h1>
                    <p className="text-current">Change your image and input your username...</p>
                </div>
                <div className="m-6">
                    <form className="mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="flex justify-center text-6xl">
                                <div className="mb-6">
                                    <div className="mt-2 flex justify-center rounded-xl bg-white">
                                        <div className="text-center" >
                                            {selectedFile &&
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={selectedFile}  style={{borderRadius:'130px',border: '1px solid', width: '250px', height:'250px'}} alt="Avatar"/>}
                                            
                                            {!selectedFile && <svg className="mx-auto h-32 w-32 text-current" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd">
                                                </path>
                                            </svg>}
                                            <div className="text-xs leading-5 text-current mt-4">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>{!selectedFile ? `Select your avatar`: `Change your avatar`} </span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onSelectFile}/>
                                                </label>
                                            </div>
                                            <p className="text-xs leading-5 text-current mt-4">PNG, JPG, GIF Files...</p>
                                            {imageError && <p className="text-xs text-rose-500 leading-5 mt-4">Image size must be smaller than 1MB.</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="mb-6">
                                    <label htmlFor="email" className={`block mb-2 text-sm ${!err ? 'text-current' : 'text-rose-500'} dark:text-gray-400`}>
                                        Your Full Name *
                                    </label>
                                    {(!user?.name || user?.name == '') && <input type="text" id="name" placeholder="Your Name..." 
                                        value={name}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            changeVal(e);
                                        }}
                                       className={`w-full px-3 py-2 placeholder-gray-300 border-2 ${!err?'border-gray-300':'border-rose-500'} rounded-md focus:outline-none focus:border-current dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`} name="username"/>}
                                    {err && <p className='text-rose-500'>This field is required!</p>}
                                    {user?.name && user?.name != '' &&                                     
                                        <input type="text" id="name" placeholder="Your Name" 
                                            value={name}
                                            className="w-full px-3 py-2 placeholder-gray-300 rounded-md focus:outline-none focus:border-current dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" name="email" disabled={true} />}
                                    
                                </div>
                                
                                <div className="my-6">
                                    <label htmlFor="email" className="block mb-2 text-sm text-current dark:text-gray-400">
                                        Email Address
                                    </label>
                                    <input type="email" id="email" placeholder="Your email address" 
                                        value={user?.email}
                                        className="w-full px-3 py-2 placeholder-gray-300 rounded-md focus:outline-none focus:border-current dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" name="award" disabled={true} />
                                </div>

                                <div className="my-6">
                                    <label htmlFor="email" className="block mb-2 text-sm text-current dark:text-gray-400">
                                        AFC Reward
                                    </label>
                                    <input type="text" id="award" placeholder="Your AFC Reward" 
                                        value={user?.afcReward ? user?.afcReward : 0}
                                        className="w-full px-3 py-2 placeholder-gray-300 rounded-md focus:outline-none focus:border-current dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" name="email" disabled={true} />
                                </div>
                                
                                <div className="mb-6 flex">
                                    <button type="button" onClick={submit}
                                        disabled={adding} 
                                        className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center mr-2">Save</button>
                                    <button type="button" onClick={submit}
                                        disabled={adding} 
                                        className="bg-white border-2 border-sky-700 text-current dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center mr-2">Cancel</button>                                    
                                </div>

                            </div>
                        </div>
                        <div className="mb-6"></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
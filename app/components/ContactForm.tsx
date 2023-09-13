"use client";

import { useState } from "react";
import { validateEmail } from "../lib/validation";
import { useSession } from "next-auth/react";
import { report } from "../lib/Report";

interface props {
    sendMessage: (data: any) => any
}
const ContactForm : React.FC<props> = ({sendMessage}) => {

    const { data: session, status } = useSession();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState<any>({
        name: false,
        email: false,
        message: false
    });

    const _onChange = (e) => {
        e.preventDefault();
        let err = error;

        if(!e.target.value || e.target.value == '') {
            err[e.target.name] = true;
        }
        else {
            err[e.target.name] = false;
        }
        debugger;
        if(e.target.name == 'email' && !validateEmail(e.target.value))
            err.email = true; 

        setError(err);
    }

    const isValid = () => {
        let err: any = {
            name: false,
            email: false,
            message: false
        };
        if(name == '')
            err.name = true;
        if(email == '' || !validateEmail(email))
            err.email = true;
        if(message == '')
            err.message = true;
        debugger;
        setError(err);
        return err;
    }

    const submit = async (e) => {
        e.preventDefault();
        let err = isValid();

        if(err.name || err.email || err.message) 
            return;

        if(!session?.user) { 
            report({type:'failure', title: 'Sorry', message: 'Please sign in...', confirm: 'confirm'});          
            return;
        }
        // send message
        const myEmail = session?.user.email;
        const sended = await sendMessage({name, myEmail, message});

        if(sended) {
            report({type: 'success', title: 'Success', message: 'sended successfully!', confirm: 'OK'});
            setName('');
            setEmail('');
            setMessage('');
            setError({
                name: false,
                email: false,
                message: false
            });
        }
        else { 
            report({type:'failure', title: 'Sorry', message: 'Server Error has been occured.', confirm: 'confirm'});
        }
    }

    return (
        <form className="px-11 pt-8 pb-12 bg-white bg-opacity-80 md:max-w-xl ml-auto rounded-4xl shadow-md">
            <label className={`block mb-4 ${error.name ? "text-rose-500": "text-gray-300"}`}>
                <p className="mb-2 font-semibold leading-normal" >Name</p>
                <div className="relative">
                    <svg className="absolute left-4 top-4" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path strokeLinecap="round" strokeLinejoin="round"  stroke="#9CA3AF" strokeWidth="1.5"d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <input
                        name="name"
                        value={name}
                        onChange={(e) => {
                            e.preventDefault();
                            setName(e.target.value);
                            _onChange(e);
                        }} 
                        className={`pl-12 pr-4 py-3 w-full text-sky-700 font-medium placeholder-gray-300 outline-none border border-${error.name ? "rose-500" : "gray-300"} current rounded-lg hover:border-sky-700`} id="contactInput3-1" type="text" placeholder="First &amp; last name"  />
                </div>
            </label>
            <label className={`block mb-4 ${error.email ? "text-rose-500": "text-gray-300"}`}>
                <p className="mb-2 font-semibold leading-normal" >Email Address</p>
                <div className="relative ">
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2" width="20" height="20" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input 
                        name="email"
                        value={email}
                        onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);                            
                            _onChange(e);
                        }} 
                        className={`pl-12 pr-4 py-3 w-full text-sky-700 font-medium placeholder-gray-300 outline-none border border-1 border-${error.email ? "rose-500" : "gray-300"} rounded-lg hover:border-sky-700`} id="contactInput3-2" type="text" placeholder="Email address"  />
                </div>
            </label>
            <label className={`block mb-4 ${error.message ? "text-rose-500": "text-gray-300"}`}>
                <p className="mb-2 font-semibold leading-normal" >Message</p>
                <div className="relative text-current">
                    <svg className="absolute left-4 top-4" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <textarea
                        name="message"
                        value={message}
                        onChange={(e) => {
                            e.preventDefault();
                            setMessage(e.target.value);
                            _onChange(e);
                        }}                      
                        className={`mb-6 p-4 px-12 w-full h-48 border-${error.message ? "rose-500" : "gray-300"} font-medium text-sky-700 outline-none placeholder-gray-300 border resize-none rounded-lg hover:border-sky-700`} id="contactInput3-3" placeholder="Write message" ></textarea>                    
                </div>
            </label>
            <div className="md:inline-block">
                <button
                    onClick={(e) => submit(e)} 
                    className="py-4 px-9 w-full text-white font-semibold border border-sky-700 rounded-xl shadow-4xl hover:border-current bg-sky-700 hover:bg-sky-700 transition ease-in-out duration-200" type="button" >Send Message</button>
            </div>
        </form>
    )
}

export default ContactForm;
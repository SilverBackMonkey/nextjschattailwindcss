/* eslint-disable @next/next/no-img-element */
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { lazy, useEffect, useRef, useState } from "react";
import { useIsMounted } from "../hooks/is-mounted";

import { redirect, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Modal from "@/components/Modal";
import { setShow } from "@/store/slices/modalSlice";
import PlayButton from "@/components/PlayButton";
import { setAuthState, setAuthUser } from "@/store/slices/authSlice";
import { current } from "@reduxjs/toolkit";

interface props {
  isAuthenticated: () => any
}

const HeaderClient: React.FC<props> = ({isAuthenticated}) => {
  // get logined user personal information
  const currentUrl = usePathname();
  useEffect(() => {
    async function fetchAuth() {
      const authState = await isAuthenticated();
      if(authState.isAuthenticated == "true" && authState.email) {
        dispatch(setAuthState(true));
        dispatch(setAuthUser(authState.email));
      }
    }
    debugger;
    fetchAuth();
    if(currentUrl == '/news') {
      setPath("/news");
    }
  }, [isAuthenticated])
  const [path, setPath] = useState("/");
  const auth = useSelector((state: RootState) => state.auth);
  const show = useSelector((state: RootState) => state.modalShow.show);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if(currentScrollPos == 0) {
        setIsScrolled(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const _onChange = (e: any) => {
      setEmail(e.target.value);
      setError(false);
  }

  const showEmailModal = () => {
      dispatch(setShow(true));
  }

  const registered = async () => {
    if(validateEmail(email)) {
      // email save and then url change
      dispatch(setAuthState(true));
      dispatch(setAuthUser(email));
      dispatch(setShow(false));

      // save email
      const response = await fetch('/regist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
    });
    const data = await response.json();

  }
    else
      // show validate email
      setError(true);
  }

  const unregistered = () => {
    // url change
    window.location.href = "https://democasino.betsoftgaming.com/cwguestlogin.do?gameId=295&amp;lang=en";
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const headerClassName = `top-0  px-12 lg:px-32 z-20 text-white dark:text-gray-300 border-b-2  ${
    isScrolled ? "sticky top-0 bg-indigo-500/50" : ""
  }`;
  return (
    <nav id="header" className={headerClassName} >
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-8">
          <div className="pl-4 flex items-center">
            <a 
              className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" 
              href="/"
              >
              <svg className="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
                <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502" transform="matrix(1,0,0,1,0,0)" />
                <path
                  className="plane-take-off"
                  d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "
                />
              </svg>
              LANDING
            </a>
          </div>
          {/* <div className="block lg:hidden pr-4">
            <button
              onClick={() => {
                setOpen(!open);
              }}
              id="nav-toggle" className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div> */}
          <div className="flex lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-transparent lg:bg-transparent p-4 lg:p-0 z-20" id="nav-content">
            <ul className={`lg:static list-reset lg:flex justify-end flex-1 items-center ${
                open ? "top-20" : "top-[-490px]"
              }`}>
              { auth && auth.authState && <li className="group relative pt-4 pb-4 cursor-pointer text-white font-bold z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100">
              
                
                {/* <a className="font-semibold uppercase mr-2 mt-1" href="/news">
                   <span className="relative flex h-8 w-8">
                    News
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 ml-1"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500 ml-1"></span>
                  </span>
                </a> */}
                <a className="relative inline-flex items-center gap-x-2 cursor-point leading-10 after:absolute after:bottom-[0px] after:left-0 after:h-[2px] after:bg-white after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100" href="/news"> 
                  <span className="absolute ml-4 mb-3 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                  </svg>
                </a>
                
              </li>}
              
            </ul>
            {/* <ul className={`lg:pb-0 pb-12 bg-transparent dark:bg-zinc-800 absolute lg:static lg:z-auto z-[2] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-100 lg:transition-none ease-in
              gap-x-20 xl:gap-x-10  text-white ${
                open ? "top-20" : "top-[-490px]"
              }`}>
               { auth && auth.authState &&
               <li className="lg:ml-8 text-xl lg:my-0 my-7">
                <a className="relative inline-flex items-center gap-x-2 cursor-point leading-10 after:absolute after:bottom-[0px] after:left-0 after:h-[2px] after:bg-white after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100" href="/news"> 
                  <span className="absolute ml-4 mb-3 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                  </svg>
                </a>
              </li>}
              {!auth  || !auth.authState && 
                <li className="lg:ml-8 text-xl lg:my-0 my-7">
                <PlayButton title="Sign Up" 
                  Icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>}
                  />
                  </li>
              }
            </ul> */}
            
          </div>
        </div>
        <Modal show={show} setShow={showEmailModal} >
        <div className="p-6 container md:w-2/3 xl:w-auto mx-auto flex flex-col xl:items-stretch justify-between md:flex-row">
          <div className="md:w-1/2 w-full md:mb-14 relative h-auto flex items-center justify-center mb-12">
              <img 
                data-te-animation-init
                data-te-animation-start="onHover"
                data-te-animation="[tada_1s_ease-in-out]"
                data-te-animation-delay="500"
                src="https://cdn.tuk.dev/assets/components/26May-update/newsletter-1.png" alt="Envelope with a newsletter" role="img" className="h-4/5 xl:w-full lg:w-1/2 w-full " />
          </div>
          <div className="md:w-1/2 xl:px-12 xl:py-28">
              <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold leading-10 text-gray-800 dark:text-white mb-4 text-center xl:text-left md:mt-0 mt-6 ">Get in touch with us!</h1>
              <p className="text-base leading-normal text-gray-600 dark:text-gray-200 text-center xl:text-left mb-6">Sign up and get to know our updates!</p>
              {/* <div className="flex items-stretch mt-12"> */}
                  <input
                      id='guestEmail'
                      value={email}
                      
                      onChange={_onChange} 
                      className={`bg-gray-100 w-full rounded-lg dark:bg-gray-800 text-base leading-none text-gray-800 dark:text-white p-5 border ${!error?'border-transparent':'border-rose-500'} focus:outline-none focus:border-gray-500 mb-2`} 
                      type="email" 
                      placeholder="dancingball@dev.com" />
                  {error && 
                      <span className="flex items-center font-medium tracking-wide text-rose-500 text-xs ml-1 mt-2">
                        Invalid Email field !
                      </span>
                  }
                  <div className="flex items-center justify-between w-full mt-6">

                  <input
                      type="button"
                      onClick={registered} 
                      className=" w-24 rounded-r-none hover:bg-indigo-600 bg-indigo-700 rounded text-base font-medium leading-none text-white mr-3 p-5 uppercase focus:outline-none focus:ring-2 ease-in-out transition duration-150 focus:ring-offset-2 focus:ring-indigo-700" value="Submit" />
                  <input
                      type="button"
                      onClick={unregistered}
                      className="w-24 rounded-l-none rounded focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 text-base font-medium p-5 uppercase " value="Cancel" />
                </div>

          </div>
      </div>
  </Modal>
      </nav>
  );
};

export default HeaderClient;
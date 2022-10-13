"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { signIn, signOut } from "next-auth/react";
import { CgMenuLeft } from "react-icons/cg";
import { useSession } from "next-auth/react";
import { useIsMounted } from "../hooks/is-mounted";

const HeaderClient = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const isMounted = useIsMounted();
  
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

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const headerClassName = `flex w-full top-0 left-0 justify-between px-12 lg:px-32 py-6 z-20 bg-white text-sky-700 dark:bg-zinc-800 dark:text-white border-b-2 ${
    isScrolled ? 'sticky top-0' : ''
  }`;

  return (
    <div id="afcHeader" className={headerClassName}>
      <div className="lg:min-w-fit lg:flex items-center justify-between py-4 lg:px-10 px-7">
        <div
          onClick={() => setOpen(!open)}
          className="text-4xl absolute left-4 top-10 lg:hidden"
        >
          <CgMenuLeft name={open ? "close" : "menu"} />
        </div>
        <div className="font-medium text-3xl cursor-pointer flex items-center">
          <Link href="/">
            <Image
              priority
              alt={"Allfreechips Casino Guide"}
              width={250}
              height={57}
              src={`https://afc-redux.vercel.app/logo.png`}
            />
          </Link>
        </div>
      </div>
      <ul
        className={`lg:grow lg:flex lg:items-center lg:pb-0 pb-12 bg-white dark:bg-zinc-800 absolute lg:static lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-100 lg:transition-none ease-in ${
          open ? "top-20" : "top-[-490px]"
        }`}
      >
        <li className="lg:ml-8 text-xl lg:my-0 my-7">
          <Link
            href="/review"
            className="font-medium hover:text-gray-400 duration-500"
          >
            Casino Reviews
          </Link>
        </li>
        <li className="lg:ml-8 text-xl lg:my-0 my-7">
          <Link
            href="/casino-bonuses"
            className="font-medium hover:text-gray-400 duration-500"
          >
            Casino Bonuses
          </Link>
        </li>
        <li className="lg:ml-8 text-xl lg:my-0 my-7">
          <Link
            href="/software"
            className="font-medium hover:text-gray-400 duration-500"
          >
            Casino Softwares
          </Link>
        </li>
        <li className="lg:ml-8 text-xl lg:my-0 my-7">
          <Link
            href="/guides"
            className="font-medium hover:text-gray-400 duration-500"
          >
            Guides
          </Link>
        </li>
        <li className="lg:ml-8 text-xl lg:my-0 my-7"></li>
      </ul>
      <div className="basis-1/4 flex items-center justify-end space-x-4 ml-2">
        <div
          className={`${
            isMounted && status !== "loading" ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          {isMounted && session ? (
            <div>
              <span>{session.user?.name}</span>
              <span
                className="mx-8 font-medium hover:text-gray-400 hover:cursor-pointer"
                onClick={() => signOut()}
              >
                Sign Out
              </span>
            </div>
          ) : (
            <span
              className="font-medium hover:text-gray-400 hover:cursor-pointer"
              onClick={() => signIn()}
            >
              Sign In
            </span>
          )}
        </div>
        {/* <button aria-label="Toggle Dark Mode" type="button" className="mx-4 bg-sky-700 text-white dark:bg-white dark:text-black p-4 rounded" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'L' : 'D'}</button>        
          <label htmlFor='check' className='bg-gray-700 dark:bg-white cursor-pointer relative w-10 h-5 lg:w-20 lg:h-10 rounded-full'>
            <input type='checkbox' name='' id='check' className='sr-only peer' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <span className='w-2/5 h-4/5 bg-black absolute rounded-full left-0.5 top-0.5 lg:left-1 lg:top-1 peer-checked:bg-black peer-checked:left-5 lg:peer-checked:left-11 transition-all  duration-500'></span>
          </label> */}
      </div>
    </div>
  );
};

export default HeaderClient;

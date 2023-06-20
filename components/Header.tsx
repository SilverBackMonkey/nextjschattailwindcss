import React, { useState } from "react";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Header = (props) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="flex w-full fixed top-0 left-0 justify-between px-12 md:px-32 py-6 z-20 bg-white text-sky-700 dark:bg-zinc-800 dark:text-white border-b-2">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div
          onClick={() => setOpen(!open)}
          className="text-4xl absolute left-4 top-10 md:hidden"
        >
          <CgMenuLeft name={open ? "close" : "menu"} />
        </div>
        <div className="font-medium text-3xl cursor-pointer flex items-center">
          <Link href="/">
            <Image
              alt={"Allfreechips Casino Guide"}
              width={250}
              height={57}
              src={`https://afc-redux.vercel.app/logo.png`}
            />
          </Link>
        </div>
      </div>
      <ul
        className={`md:flex md:items-center md:pb-0 pb-12 bg-white dark:bg-zinc-800 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-1000 md:transition-none ease-in ${
          open ? "top-20" : "top-[-490px]"
        }`}
      >
        <li className="md:ml-8 text-xl md:my-0 my-7">
          <Link
            href="/review"
            className="font-medium hover:text-gray-400 duration-500"
          >
            Casino Reviews
          </Link>
        </li>
        <li className="md:ml-8 text-xl md:my-0 my-7">
          <Link
            href="/casino-bonuses"
            className="font-medium hover:text-gray-400 duration-500"
          >
            Casino Bonuses
          </Link>
        </li>
        <li className="md:ml-8 text-xl md:my-0 my-7">
          <Link
            href="/software"
            className="font-medium hover:text-gray-400 duration-500"
          >
            Casino Softwares
          </Link>
        </li>
        <li className="md:ml-8 text-xl md:my-0 my-7">
          <Link
            href="/guides"
            className="font-medium hover:text-gray-400 duration-500"
          >
            Guides
          </Link>
        </li>
        <li className="md:ml-8 text-xl md:my-0 my-7"></li>
      </ul>
      <div className="flex items-center space-x-4 ml-2">
        <div>
          {session ? (
            <div>
              <span>{session.user?.name ?? "Unknown"}</span>
              <span
                className="mx-8 font-medium hover:text-gray-400 duration-500 hover:cursor-pointer"
                onClick={() => signOut()}
              >
                Sign Out
              </span>
            </div>
          ) : (
            <span
              className="font-medium hover:text-gray-400 duration-500 hover:cursor-pointer"
              onClick={() => signIn()}
            >
              Sign In
            </span>
          )}
        </div>
        {/* <button aria-label="Toggle Dark Mode" type="button" className="mx-4 bg-sky-700 text-white dark:bg-white dark:text-black p-4 rounded" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'L' : 'D'}</button>        
          <label htmlFor='check' className='bg-gray-700 dark:bg-white cursor-pointer relative w-10 h-5 md:w-20 md:h-10 rounded-full'>
            <input type='checkbox' name='' id='check' className='sr-only peer' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <span className='w-2/5 h-4/5 bg-black absolute rounded-full left-0.5 top-0.5 md:left-1 md:top-1 peer-checked:bg-black peer-checked:left-5 md:peer-checked:left-11 transition-all  duration-500'></span>
          </label> */}
      </div>
    </div>
  );
};

export default Header;

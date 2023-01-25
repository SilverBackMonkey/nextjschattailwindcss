"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { signIn, signOut } from "next-auth/react";
import { CgMenuLeft } from "react-icons/cg";
import { useSession } from "next-auth/react";
import { useIsMounted } from "../hooks/is-mounted";
import SearchResult from './search/SearchResult';
import FullModal from './components/FullModal';
const HeaderClient = ({getData, getCount}) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const isMounted = useIsMounted();
  const [searchKey, setSearchKey] = useState('');
  const [key, setKey] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

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

  const changeVal = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  }

  const search = () => {
    if(searchKey != undefined && searchKey != '' ) {
      debugger;
      setKey(searchKey);
      setShowSearchModal(true);
    }
  }

  const headerClassName = `flex w-full top-0 left-0 justify-between px-12 lg:px-32 py-6 z-20 bg-white text-sky-700 dark:bg-zinc-800 dark:text-white border-b-2 ${
    isScrolled ? 'sticky top-0' : ''
  }`;
  
  return (
    <div className={headerClassName}>
      <div className="lg:min-w-fit flex items-center justify-between py-2 lg:px-10 px-7">
        <div
          onClick={() => setOpen(!open)}
          className="text-4xl absolute left-4 lg:hidden"
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
        {open && 
          <li className="lg:ml-8 text-xl lg:my-0 my-7 w-2/5">
            <div className="relative text-current lg:hidden">
              <form action={search}>
              <input 
                type="search" 
                name="serch"
                value={searchKey}
                onChange={e => changeVal(e)} 
                placeholder="Search" 
                className="bg-gray h-10 sm:w-40 md:w-48 px-5 pr-10 border-2 border-gray-500 hover:border-current rounded-full text-md focus:outline-none" />
              </form>
            </div>
          </li>  
        }
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
        {/* <li className="lg:ml-8 text-xl lg:my-0 my-7"></li> */}
      </ul>
      <div className="md:basis-1/4 flex items-center justify-end space-x-4 ml-2 mt-2">
        <div className="relative text-current hidden lg:block">
          <form action={search}>
          <input 
            type="search" 
            name="serch"
            value={searchKey}
            onChange={e => changeVal(e)} 
            placeholder="Search" 
            className="bg-gray h-10 sm:w-40 md:w-48 px-5 pr-10 border-2 border-gray-500 hover:border-current rounded-full text-md focus:outline-none" />
          
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{background:"new 0 0 56.966 56.966"}} xmlSpace="preserve" width="512px" height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
          </button>
          </form>
        </div>
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
                Sign&nbsp;Out
              </span>
            </div>
          ) : (
            <span
              className="font-medium hover:text-gray-400 hover:cursor-pointer"
              onClick={() => signIn()}
            >
              Sign&nbsp;In
            </span>
          )}
        </div>
        {/* <button aria-label="Toggle Dark Mode" type="button" className="mx-4 bg-sky-700 text-white dark:bg-white dark:text-black p-4 rounded" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'L' : 'D'}</button>        
          <label htmlFor='check' className='bg-gray-700 dark:bg-white cursor-pointer relative w-10 h-5 lg:w-20 lg:h-10 rounded-full'>
            <input type='checkbox' name='' id='check' className='sr-only peer' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <span className='w-2/5 h-4/5 bg-black absolute rounded-full left-0.5 top-0.5 lg:left-1 lg:top-1 peer-checked:bg-black peer-checked:left-5 lg:peer-checked:left-11 transition-all  duration-500'></span>
          </label> */}
      </div>
      {showSearchModal && <FullModal setShow={setShowSearchModal}  search={search}  searchKey={searchKey} changeVal={changeVal}>
        <SearchResult searchkey={key} getData={getData} getCount={getCount}/>
      </FullModal>}
    </div>
  );
};

export default HeaderClient;
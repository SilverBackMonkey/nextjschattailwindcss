/* eslint-disable @next/next/no-img-element */
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { lazy, useEffect, useRef, useState } from "react";
import { useIsMounted } from "../hooks/is-mounted";

const factorySearchResult = () => import("./search/SearchResult");
const SearchResult = lazy(factorySearchResult);

const factoryFullModal = () => import("./components/FullModal");
const FullModal = lazy(factoryFullModal);

import { usePathname, useRouter } from "next/navigation";

const HeaderClient = ({ mobileIcon }) => {
  // get logined user personal information
  const { data: session, status } = useSession();
  // useRef when clicking outside of the showAvatarProfile
  const wrapperRef = useRef(null);

  const [showAvatar, setShowAvatar] = useState(false);
  // show Search Modal state
  const [open, setOpen] = useState(false);
  // get User information.
  const isMounted = useIsMounted();

  // search key
  const [searchKey, setSearchKey] = useState("");
  // search key in modal
  const [key, setKey] = useState("");
  // search start
  const [showSearchModal, setShowSearchModal] = useState(false);

  // hide / show header when scrolling up and down
  const [isScrolled, setIsScrolled] = useState(true);
  // estimate scroll pos
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // control router
  const router = useRouter();
  const path = usePathname();

  // register for click out side of the avatarProfile
  function useOutsideComponent(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowAvatar(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideComponent(wrapperRef);

  // hide/ show headbar
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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (
      path !== "/myprofile" &&
      status === "authenticated" &&
      (session?.user?.name?.length ?? 0) < 1
    )
      router.push("/myprofile");
  }, [path, router, session, status]);

  const changeVal = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  };

  const search = () => {
    if (searchKey != undefined && searchKey != "") {
      setKey(searchKey);
      setShowSearchModal(true);
    }
  };

  const headerClassName = `flex w-full top-0 left-0 justify-between px-12 lg:px-32 py-6 z-20 bg-white text-sky-700 dark:bg-zinc-800 dark:text-white border-b-2 ${
    isScrolled ? "sticky top-0" : ""
  }`;

  return (
    <div className={headerClassName}>
      <div className="lg:min-w-fit flex items-center justify-between py-2 lg:px-10 px-7">
        <div
          onClick={() => setOpen(!open)}
          className="text-4xl absolute left-4 lg:hidden"
        >
          {mobileIcon}
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
        {open && (
          <li className="lg:ml-8 text-xl lg:my-0 my-7 w-2/5">
            <div className="relative text-current lg:hidden">
              <form action={search}>
                <input
                  type="search"
                  name="serch"
                  value={searchKey}
                  onChange={(e) => changeVal(e)}
                  placeholder="Search"
                  className="bg-gray h-10 sm:w-40 md:w-48 px-5 pr-10 border-2 border-gray-500 hover:border-current rounded-full text-md focus:outline-none"
                />
              </form>
            </div>
          </li>
        )}
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
              onChange={(e) => changeVal(e)}
              placeholder="Search"
              className="bg-gray h-10 sm:w-40 md:w-48 px-5 pr-10 border-2 border-gray-500 hover:border-current rounded-full text-md focus:outline-none"
            />

            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ background: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </form>
        </div>
        <div
          className={`${
            isMounted && status !== "loading" ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <div className="flex items-center">
            <div className="relative">
              {isMounted && session && session.user ? (
                <div
                  onClick={() => setShowAvatar(true)}
                  className="cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out items-center"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user?.image}
                      width={32}
                      height={32}
                      className="rounded"
                      alt={session.user?.name || "Unknown User"}
                    />
                  ) : (
                    <span className="rounded-full bg-yellow-500 text-white w-10 h-10 flex items-center justify-center">
                      {session.user?.name}
                    </span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 text-gray-600 dark:text-gray-200 icon icon-tabler icon-tabler-chevron-down"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              ) : (
                <span
                  className="font-medium hover:text-gray-400 hover:cursor-pointer"
                  onClick={() => signIn()}
                >
                  Sign&nbsp;In
                </span>
              )}
              {showAvatar && (
                <div ref={wrapperRef}>
                  <div className="bg-white dark:bg-gray-900 border border-white dark:border-gray-800 rounded absolute top-0 right-0 mt-12 shadow z-50 fadeIn">
                    <p className="text-gray-700 dark:text-gray-300 text-sm pb-3 pt-3 px-5 border border-t-0 border-l-0 border-r-0 border-gray-200 dark:border-gray-700 ">
                      {session?.user?.email}
                    </p>
                    {session?.user && session?.user?.name && (
                      <a
                        className="block text-gray-600 dark:text-gray-400 text-sm pb-3 pt-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                        href="#"
                      >
                        {session.user?.name}
                      </a>
                    )}
                    <a
                      className="block text-gray-600 dark:text-gray-400 text-sm pb-3 pt-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      href="/myprofile"
                    >
                      Account Settings
                    </a>

                    <p
                      className="block text-gray-600 dark:text-gray-400 text-sm pb-3 pt-3 px-5 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>

      </div>
      {showSearchModal && (
        <FullModal
          setShow={setShowSearchModal}
          search={search}
          searchKey={searchKey}
          changeVal={changeVal}
        >
          <SearchResult searchkey={key} />
        </FullModal>
      )}
    </div>
  );
};

export default HeaderClient;

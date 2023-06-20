import Link from "next/link";
import {
  FaAngleRight,
  FaBalanceScale,
  FaGift,
  FaGifts,
  FaHandsWash,
} from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
import Feed from "../../components/feed";
import CreatePost from "../../components/feed/CreatePost";

const style = {
  wrapper: `flex min-h-screen flex-col bg-black text-white`,
  main: `mx-auto flex w-full max-w-5xl flex-1 space-x-6 py-5 px-6`,
  content: `w-full space-y-4 lg:w-2/3`,
  infoContainer: `hidden w-1/3 lg:block`,
};

export default function DiscussionContent({ myPosts }) {
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1 mt-28">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="/">AFC Home</Link>
            </span>
            <FaAngleRight />
            <span>Allfreechips Discussions</span>
          </div>
        </div>
      </div>

      <div className={style.wrapper}>
        <main className={style.main}>
          <div className={style.content}>
            <CreatePost />
            <Feed post={myPosts} />
          </div>
          <div className={style.infoContainer}></div>
        </main>
      </div>

      <div className="flex flex-col m-4 bg-sky-100 dark:bg-gray-300 dark:text-black pt-4 pb-10 px-8 text-center rounded-xl md:mx-40">
        <p className="font-medium md:text-2xl">WE&apos;VE DONE THE HOMEWORK</p>
        <h4 className="text-2xl py-4 font-medium leading-8 md:text-4xl md:my-4">
          See our top player guides for online casinos
        </h4>
        <ul className="font-normal py-2 items-center text-lg md:flex md:justify-around md:text-2xl">
          <li className="flex justify-center items-center">
            <FaBalanceScale className="m-2" />
            Online Casino Banking
          </li>
          <li className="flex justify-center items-center">
            <FaHandsWash className="m-2" />
            New Online Slots
          </li>
          <li className="flex justify-center items-center">
            <TbBeach className="m-2" />
            RTG Slots Machines
          </li>
          <li className="flex justify-center items-center">
            <FaGifts className="m-2" />
            Microgaming Slots
          </li>
          <li className="flex justify-center items-center">
            <FaGift className="m-2" />
            Betsoft Slots
          </li>
        </ul>
      </div>
    </div>
  );
}

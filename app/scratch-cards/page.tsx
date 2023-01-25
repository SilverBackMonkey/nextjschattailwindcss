import Link from "next/link";
import { Scratcher } from "./scratcher";


import { Metadata } from "next";


export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Free Play Scratch Cards for real money prizes"
  const description = "The legendary Allfreechips Free Scratch cards allow you play every hour for free wi win real cash prizes."
  return {
    title: Title,
    description: description,
  };
}
export default function ScratcherPage() {
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-3">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="/">AFC Home</Link> / Scratcher
            </span>
          </div>
        </div>
      </div>
      {/* @ts-expect-error */}
      <Scratcher></Scratcher>
    </div>
  );
}

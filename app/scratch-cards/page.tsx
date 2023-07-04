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
      {/* @ts-expect-error */}
      <Scratcher></Scratcher>
    </div>
  );
}

import Guides from "@/components/Guides";
import Link from "next/link";
import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    monthYear() + " Current online gambling guide list";
  const description =
    "Online casino guides with detailed information on slots, games and bonus types along with how to instructions.";
  return {
    title: Title,
    description: description,
  };
}

export default async function Page() {
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1 mt-4">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="/">AFC Home</Link> / Guides
            </span>
          </div>
        </div>
      </div>
      <Guides />
    </div>
  );
}

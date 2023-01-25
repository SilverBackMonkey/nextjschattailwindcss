import Link from "next/link";
import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    monthYear() + " Top online casino bonuses and casino bonus codes";
  const description =
    "See the latest online casino bonuses for " + monthYear() + " along with the casino codes, reviews and slot games you can play at them.";
  return {
    title: Title,
    description: description,
  };
}
export default async function page() {
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="../">AFC Home</Link> / Casino Bonuses
            </span>
          </div>
        </div>
      </div>
      <div className="md:px-24 py-8 text-center mt-2 p-2">
        <h2 className="text-3xl font-semibold px-8 md:text-6xl md:">Header</h2>
        <p className="py-6 font-medium md:text-xl md:my-10">TEXT</p>
      </div>
    </div>
  );
}

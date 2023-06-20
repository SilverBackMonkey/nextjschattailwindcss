import Link from "next/link";
import { Scratcher } from "./scratcher";
export default function ScratcherPage() {
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1 mt-28">
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

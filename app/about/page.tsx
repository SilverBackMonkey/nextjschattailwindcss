import Link from "next/link";

export default async function page() {
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1 mt-28">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="../">AFC Home</Link> {">"} About Us
            </span>
          </div>
        </div>
      </div>
      <div className="md:px-24 py-8 text-center mt-2 p-2">
        <h2 className="text-3xl font-semibold px-8 md:text-6xl md:">
          About Allfreechips.com of AFC MEDIA LLC
        </h2>
        <p className="py-6 font-medium md:text-xl md:my-10">
          Allfreechips.com was established in July of 2004, we have come a long
          way by leveraging our footprint in the online gambling community to
          deliver the very best online casino bonuses for our users. Below we
          are proud to display a little walk through time showing revisions of
          who we are over time, finally landing on this super responsive Next.js
          powered site.
        </p>
      </div>
    </div>
  );
}

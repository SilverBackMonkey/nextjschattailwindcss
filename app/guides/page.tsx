import Guides from "@/components/Guides";

import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";
export const revalidate = 300;
export const dynamic = "force-static"

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
      <Guides />
    </div>
  );
}

import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Best online casinos for " + monthYear() + " by Allfreechips"
  const description = monthYear() + " Top online casinos with the best casino bonuses and promotions"
  return {
    title: Title,
    description: description,
  };
}

export default function BestOnlineCasinos() {
  return <main>wip</main>;
}

import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
export async function generateMetadata({ params }): Promise<Metadata> {
    const Title =
      monthYear() + " Latest online slot machine releases and slot machine guide";
    const description =
      "Allfreechips has over 13,000 online slot reviews along with the latest releases many you can play for free.";
    return {
      title: Title,
      description: description,
    };
  }

  
export default function Slots () {
    return (
        <div>SLOTS</div>
    )
}
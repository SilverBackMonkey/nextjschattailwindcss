
import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";
export async function generateMetadata({ params }): Promise<Metadata> {
    const Title =
      "Latest Online casino reviews and detailed bonus information";
    const description =
      "Greatest online Casinos for "+ monthYear() + " and latest casino bonuses.";
    return {
      title: Title,
      description: description,
    };
  }
  
export default function Review() {
    return (
        <div>Casino Reviews</div>
    )
}
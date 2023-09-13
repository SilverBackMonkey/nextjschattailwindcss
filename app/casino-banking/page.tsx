import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Online Casino Banking option guide";
  const description =
    "Learn about your banking option for all the online casinos, although Bitcoin is preferred there are many other bank options for online gambling.";
  return {
    title: Title,
    description: description,
  };
}
export default function Banks() {
  return <div>Banks Coming soon!</div>;
}

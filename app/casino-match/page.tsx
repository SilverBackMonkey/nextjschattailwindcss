import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Allfreechips Casino Match :: Find your next best online casino in seconds"
  const description = "Allfreechips Casino Match allows you to fine tune your likes about online casinos and delivers that news directly to you on one page."
  return {
    title: Title,
    description: description,
  };
}

export default function Match () {
    return(<div>MATCH</div>)
}
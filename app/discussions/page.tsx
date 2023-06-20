import prisma from "../../client";
import DiscussionContent from "./DiscussionContent";
import DiscussionRefresher from "./DiscussionRefresher";

export default async function Discussions() {
  const myPosts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return (
    <>
      <DiscussionContent myPosts={myPosts} />
      <DiscussionRefresher intervalMs={2000} />
    </>
  );
}

export const metadata = {
  title: "Allfreechips Casino Discussions",
  description:
    "Come and see what is hot on the Allfreechips discussions boards",
};

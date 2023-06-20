
import Link from "next/link";
import Post from "../../../../components/common/Post";
import prisma from "../../../../client";
import {
  FaAngleRight,
} from "react-icons/fa";
import Comments from "../../../../components/commentsSection/Comment";
import SaveComment from "../../../../components/commentsSection/SaveComment";
export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      comments: {
        include : {
          author: {
            select : {
              name : true,
              image : true,
            }
          }
        },
      },
      author: true,
      
    },
   
  });

  const style={
    containerWrapper : 'w-full space-y-4 lg:w-2/3',
    container:'mx-auto flex w-full max-w-5xl flex-1 space-x-6 py-[5rem] px-6',
  }
  
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="/">AFC Home</Link>
            </span>
            <FaAngleRight />
            <span>
              <Link href="/discussions">Discussions</Link>
            </span>
            <FaAngleRight />
            <span>Allfreechips Post</span>
          </div>
        </div>
      </div>
      
      <div className={style.container}>
        <div className={style.containerWrapper}>
        {post ? (
          <>
            <Post {...post} />
            <SaveComment postId={post.id} />
            <Comments comments={post.comments} />
          </>
        ) : (
          <p>Loading...</p>
        )}
        </div>
        </div>
     
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: params.id,
    description : "This page is all about post " + params.id,
  };
}

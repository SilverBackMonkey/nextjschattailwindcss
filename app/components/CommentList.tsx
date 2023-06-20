
import prisma from "../../client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { revalidatePath, revalidateTag } from "next/cache";
import * as React from 'react';

// import cache from 'memory-cache'
import { Metadata } from "next";
import MessageList from "../chat/_Components/MessageList";
import { SendMessageIcon } from "../chat/_lib/ChatData";
import { addComment, getComment } from "../lib/CommentFetch";
import Comment from "./Comment";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Allfreechips Community Chat, lets talk about whatever!"
  const description = "Hang out with the fun AFC members and discuss anything you like as long as you do not get offensive."
  return {
    title: Title,
    description: description,
  };
}

interface Props {
    type: number,
    parent: string,
}

const CommentList = async ({type, parent}) => {
  ""
  // const comments = await getComment(type, parent);

  const session = await getServerSession(authOptions);
  //@ts-expect-error
  const userEmail: string = session?.user?.email;
  // const userEmail: string = "lionmarksham@gmail.com";
  ////@ts-expect-error
  // const myId: string = session?.user?.id;
  let user = await prisma.user.findFirst({
    where:{
        email: userEmail
    }
  });

  return (
    <>  
        <Comment type={type} addComment={addComment} parent={parent} user={user} getComment={getComment}/>
    </>
  );
}

export default CommentList;
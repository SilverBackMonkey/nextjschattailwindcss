import prisma from "../../client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { revalidatePath, revalidateTag } from "next/cache";
import * as React from 'react';
import ShoutBox from "./_Components/ShoutBox";
import OnIntervalFn from "./_lib/OnIntervalFn";
import MessageList from "./_Components/MessageList";
// import cache from 'memory-cache'
import { Metadata } from "next";
import { aggregateMessageLike } from "./_lib/utils";


export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Allfreechips Community Chat, lets talk about whatever!"
  const description = "Hang out with the fun AFC members and discuss anything you like as long as you do not get offensive."
  return {
    title: Title,
    description: description,
  };
}
export default async function Chat() {
  ""
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
  if (!userEmail || userEmail == "" || user?.role == 3) {
    user = null;
  }
  const myId = user?.id;

  async function updateMessage (message:any) {
    "use server";
    try {
      await prisma.chatMessage.update({
      where: {
        id: message.id
      },
      data: {
        message: message.message
      }
    })}
    catch(error) {
      console.log(error)
    } 
  }
  
  async function removeMessage (messageId: string) {
    "use server";
    
    try {
      const result = await prisma.chatMessage.delete({
      where:{
        id:messageId
      }
    })
  }
    catch(error) {
      console.log(error)
      return error
    } 
    return messageId;
  }

  async function like (message: any) {
    "use server"
    if(myId)
    try {
      let liked = await prisma.tb_pbot.findFirst({
        where:{
          messageId:message.id,
          authorId: myId
        }
      });

      if (message.userId != myId && myId ) {
        if(!liked) {
          await prisma.tb_pbot.create({
            data: { messageId:message.id, authorId: myId}
          });

          await prisma.chatMessage.update({
            where: {
              id: message.id
            },
            data:{like: {increment:1}}
          });
          
        }

        else {
          await prisma.tb_pbot.delete({
            where: { id: liked.id}
          });
          await prisma.chatMessage.update({
            where: {
              id: message.id
            },
            data:{like: {decrement:1}}
          });
        }
      }
    }
    catch(error) {
      console.log(error)
    }

    return message;

  }



  async function sendMessage(message: any) {
    "use server"; 

    if (message.length > 0 && message.length <= 400) {
      try {
        let result = await prisma.chatMessage.create({
          data: { message, author: { connect: { email: userEmail } }, like:0 },
        });

        let updatedMessages: any = await prisma.chatMessage.findMany({
          select: {
            createdAt: true,
            message: true,
            authorId: true,
            like: true,
            id: true,
            author: {select: {name: true, image: true, role: true, email: true} },  
            likes:{select: {authorId: true}, where:{authorId: user?.id}}
          },
          where:{
            id: result.id
          },
          orderBy:{
            createdAt:'desc'
          }
        });
        return updatedMessages[0];
      }
      catch(error) {
        console.log(error)
      }
    }
    
  }
  async function getMessages() {
    "use server"; 

      try {
        let messages = await prisma.chatMessage.findMany({
          select: {
            createdAt: true,
            message: true,
            authorId: true,
            like: true,
            id: true,
            author: {select: {name: true, image: true, role: true, email: true} },  
            likes:{select: {authorId: true}, where:{authorId: user?.id}}
          },
          orderBy:{
            createdAt:'desc'
          }
        });
        
        let updatedMessages = aggregateMessageLike(messages);

        return updatedMessages;
      }
      catch(error) {
        console.log(error)
      }
  }
  
  return (
    <>
    <section className="bg-white dark:bg-gray-900 md:py-6 lg:py-8 md:py-4">
      <MessageList getMessages={getMessages} user={user} like={like} updateMessage={updateMessage} removeMessage={removeMessage} sendMessage={sendMessage}/>
    </section>
    </>
  );
}


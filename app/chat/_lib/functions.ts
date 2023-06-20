import { revalidateTag } from "next/cache";
import prisma  from "../../../client";
import { cache } from "sharp";

export const getMessages = async () => {
    try {
        const messages = await prisma.chatMessage.findMany({
    
            select: {
              id: true,
              message: true,
              createdAt: true,
              like: true,
              author: { select: { image: true, name: true, id: true,email: true }},
            },
            orderBy: { createdAt: "desc" },
            take: 10,
          });

        if(messages) {
            return messages;
        }
        else
            throw new Error('Message not found');
    }
    catch(error) {
        console.log(error);
    }
}

export const sendMessage = async (event:any, userEmail: any) => {
    const message = event.message?.toString() ?? "";
    if (message.length > 0 && message.length <= 400) {
        try {
            await prisma.chatMessage.create({
                data: { message, author: { connect: { email: userEmail } }, like:0 },
            });
        }
        catch(error) {
            console.log(error);
        }
    }
    revalidateTag('chat');

}
export const like = async (message: any, myId: any) => {
    "use server"
    try {
        let liked = await prisma.tb_pbot.findFirst({
            where:{
                messageId:message.id,
                authorId: myId
            }
            });
            if (message.userId != myId && !liked) {
            await prisma.tb_pbot.create({
                data: { messageId:message.id, authorId: myId}
            });

            await prisma.chatMessage.update({
                where: {
                id: message.id
                },
                data:{like: message.like + 1}
            });
        }
    }
    catch(error) {
        console.log(error)
    }
    revalidateTag('chat');

  }
import prisma from '@/client';
import React from 'react';

export async function  getComment(type, parent, count) {
  "use server";
  try{
    console.log(type);
    console.log(parent);
    const comments:any = await prisma.comments.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: { select: { image: true, name: true, id: true, email: true } },
      },
      where:{
        type:type,
        parentId: parent
      },
      take: count
    })
    return comments;
  }
  catch(err){
    console.log(err);
  }
  finally{
    prisma.$disconnect();
  }
}

export async function  addComment(comment) {
  "use server";
  
  try{
    const newComment:any = await prisma.comments.create({
      data:{
        type:comment.type,
        parentId:comment.parent,
        authorId: comment.authorId,  
        content:comment.content
      }
    })
    
    return newComment;
  }
  catch(error) {
    console.log(error)
  }
  finally{
    prisma.$disconnect();
  }
}
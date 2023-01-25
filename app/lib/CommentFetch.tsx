import prisma from '@/client';
import React from 'react';

export async function  getComment(type, parent) {
  "use server";
  
  try{
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
      orderBy:{
        createdAt: "desc"
      },
    })
    return comments;
  }
  catch(err){
    console.log(err);
  }
}

export async function getCountComment(type, parent) {
  "use server";
  
  try{
    const count = await prisma.comments.count({
      where:{
        type:type,
        parentId: parent
      }
    })
    return count;
  }
  catch(err){
    console.log(err);
  }
}

export async function  addComment(comment) {
  "use server";
  
  try{
    let newComment = await prisma.comments.create({
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: { select: { image: true, name: true, id: true, email: true } },
      },
      data:{
        type:comment.type,
        parentId:comment.parent,
        author: { connect: { id: comment.authorId } },
        content:comment.content
      }
    })

    let result = await prisma.comments.findFirst({
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: { select: { image: true, name: true, id: true, email: true } },
      },
      where:{
        id: newComment.id
      }
    })
    console.log(result);
    return result;
  }
  catch(error) {
    console.log(error)
  }
}
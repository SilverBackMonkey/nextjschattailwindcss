import prisma from '@/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
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
  const session: any = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  
  let user = await prisma.user.findFirst({
    where:{
        email: userEmail
    }
  });

  if (!userEmail || userEmail.length == 0 || user?.role == 3) {
    user = null;
  }
  if(user)
    try{
      const {type, parent, content} = comment;
      if(type==1) {
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
            author: { connect: { id: user?.id } },
            content:comment.content,
            casino_comments: {connect: {id: comment.parent}}
          }
        })
        return newComment;
      }
      if(type == 2) {
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
            author: { connect: { id: user?.id } },
            content:comment.content,
            game_comments: {connect: {game_id: comment.parent}}
          }
        })
        return newComment;
      }
      if(type == 3) {
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
            author: { connect: { id: user?.id } },
            content:comment.content,
            news: {connect: {id: comment.parent}}
          }
        })
        return newComment;
      }
    }
    catch(error) {
      console.log(error)
    }
}
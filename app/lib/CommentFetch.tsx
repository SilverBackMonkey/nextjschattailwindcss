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
    const {type, parent, content} = comment;
    const authorId = comment.authorId;
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
          author: { connect: { id: comment.authorId } },
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
          author: { connect: { id: comment.authorId } },
          content:comment.content,
          game_comments: {connect: {game_id: comment.parent}}
        }
      })
      return newComment;
    }
  }
  catch(error) {
    console.log(error)
  }
}
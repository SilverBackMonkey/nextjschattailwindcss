import prisma from '@/client';
import React from 'react';
import Rating from '../components/rating';

export async function  getRating(type, parent, authorId) {
  "use server";
  try{
    if(authorId){
        const result = await prisma.rating.findFirst({
            where:{
                type: type,
                parentId: parent,
                authorId: authorId
            }
        })
        return result?.rating;
    }
    if(!authorId) {
        const result = await prisma.rating.aggregate({
            _avg:{
                rating:true,
            },
            where:{
                type: type,
                parentId: parent,
            }
        })
        return result?._avg?.rating;        
    }
    return 0;
  }
  catch(err){
    console.log(err);
  }

}
export async function  setRating(rating, type, parent, authorId) {
    "use server";
    try{
      const newRating = await prisma.rating.create({
        select: {
            id: true,
            rating: true,
            type: true,
            parentId: true,
            author: { select: { image: true, name: true, id: true, email: true } },
        },
        data:{
          type:type,
          parentId:parent,
          author: { connect: { id: authorId } },
          rating:rating
        }
      })
      return newRating;
    }
    catch(err){
      console.log(err);
    }

  }
  
import prisma from '@/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import React from 'react';

export async function getLoginUser() {
  "use server";
  try{
    const session = await getServerSession(authOptions);
    ////@ts-expect-error
    // const userEmail: string = session?.user?.email;
    const userEmail: string = "lionmarksham@gmail.com";
    ////@ts-expect-error
    // const myId: string = session?.user?.id;
    let user = await prisma.user.findFirst({
      where:{
          email: userEmail
      }
    });
    console.log(user);
    return user;
  }
  catch(err){
    console.log(err);
  }
  finally{
    prisma.$disconnect();
  }
}
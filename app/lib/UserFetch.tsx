import prisma from '@/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { auth } from '@clerk/nextjs';
import { getServers } from 'dns';
import { getServerSession } from 'next-auth';
import React from 'react';

export async function getLoginUser() {
  "use server";
  try{
    const session = await getServerSession(authOptions);
    //@ts-expect-error
    const userEmail: string = session?.user?.email;
    // const userEmail: string = "kennystwork@gmail.com";
    ////@ts-expect-error
    // const myId: string = session?.user?.id;
    if(userEmail){
      let user = await prisma.user.findFirst({
        where:{
            email: userEmail
        }
      });
      return user;
    }
  }
  catch(err){
    console.log(err);
  }
}

export async function updateUser() {
  "use server";

  try{
    const session = await getServerSession(authOptions);
    //@ts-expect-error
    const userEmail: string = session?.user?.email;
    
    if(userEmail){
      return;
    //   await prisma.user.update({
    //     where: {
    //       email: userEmail,
    //       : null,
    //     },
    //     data: {
    //       name: {
    //         set: {
    //           select: {
    //             vb_user: {
    //               where: {
    //                 user_afc: { not: 0 },
    //               },
    //               select: {
    //                 username: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //       afcRewards: {
    //         set: {
    //           select: {
    //             vb_user: {
    //               where: {
    //                 user_afc: { not: 0 },
    //               },
    //               select: {
    //                 user_afc: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   });
    }

  }
  catch(err) {
    console.log(err);
  }
}
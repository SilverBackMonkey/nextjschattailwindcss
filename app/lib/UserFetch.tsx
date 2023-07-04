import prisma from '@/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServers } from 'dns';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export async function getLoginUser() {
  "use server";
  try{
    const session = await getServerSession(authOptions);
    //@ts-expect-error
    const userEmail: string = session?.user?.email;

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
  return undefined;
}

export async function updateUser() {
  "use server";

    const session:any = await getServerSession(authOptions);
    ////@ts-expect-error
    const userEmail: string = session?.user?.email;
    const username: any = session?.user?.name;
    // const userEmail = 'lionjfkdjka@gmail.com';
    // const username = null;

    // when username does not exist though user login
    if(userEmail && (!username || username === '')) {
      const originUsers = await prisma.vb_user.findMany({
        select:{
          username: true,
          user_afc: true,
        },
        where:{
          email:userEmail,
        }
      });

      // when this user exist in origin site
      if (originUsers && originUsers.length > 0)
        var user: any = originUsers[0];

        // update user information if this user exist in original site
        try{  
          const updateuser = await prisma.user.update({
            where:{
              email: userEmail
            },
            data:{
              name: user?.username,
              afcRewards: user?.user_afc,
              emailVerified: new Date(),
            }
          })

          return updateuser?.name;
        }
        catch(err) {
          console.log(err);
        }
    }
    return username;

}

export async function addUsername(email: string, username: string, avatar: any) {
  "use server";

  try{
    await prisma.user.update({
      where:{
        email:email
      },
      data:{
        name: username,
        image: avatar,
        emailVerified: new Date(),
      }
    });
    return true;
  }
  catch(err) {
    console.log(err);
    return false;
  }
  return false;
}
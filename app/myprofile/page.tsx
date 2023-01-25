import Guides from "@/components/Guides";
import Link from "next/link";
import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";
import Profile from "../components/Profile";
import Image from "next/image";
import { addUsername, getLoginUser, updateUser } from "../lib/UserFetch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/client";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    monthYear() + " Current online gambling guide list";
  const description =
    "Online casino guides with detailed information on slots, games and bonus types along with how to instructions.";
  return {
    title: Title,
    description: description,
  };
}


export default async function Page() {
    
  const session = await getServerSession(authOptions);
  //@ts-expect-error
  const user: any = session?.user;

  if(user && user.email && (!user?.name || user?.name === '')){
    updateUser();    
  }
  if(!user) {
    
  }

  return (
        <Profile user={user} addUsername={addUsername}/>
    );
}
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
import { revalidatePath } from "next/cache";
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
  const userEmail: string = session?.user?.email;

  let user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      afcRewards: true, 
    },
    where:{
        email: userEmail
    }
  });

  if (!userEmail) {
    user = null;
  }

  if(user && user.email && (!user.name || user.name === '')){
    const name = await updateUser();
    if (name && name.length > 0) revalidatePath('/myprofile');
  }

  return (
        <Profile user={user} addUsername={addUsername}/>
    );
}
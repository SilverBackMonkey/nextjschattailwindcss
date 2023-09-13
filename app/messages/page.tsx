import Guides from "@/components/Guides";
import Link from "next/link";
import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";
import { fetchAllMessages, removeItemfromNotificationlist } from "../lib/NotificationFetch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { revalidatePath, revalidateTag } from "next/cache";
import Messages from "../components/Notification/Message";
import { revalidate } from "../software/[slug]/page";
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

    const session: any = await getServerSession(authOptions);
  
    const userEmail: string = session?.user?.email;
    const messages = await fetchAllMessages(userEmail);
    return (
        <div className="text-current container mx-auto overflow-hidden md:rounded-lg md:p-6 lg:p-8">
            <div className="h-12 md:h-20"></div>
            <p className="font-sans text-4xl font-bold text-current max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">All Messages!</p>
            <div className="h-10"></div>

            <Messages messages={messages} readMessage={removeItemfromNotificationlist} />

        </div>
    );
}

import prisma from "../../client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// @ts-expect-error
import { revalidatePath ,revalidateTag} from "next/server";
import { Suspense } from "react";
import OnIntervalFn from "./OnIntervalFn";
import EmojiPicker from "@/components/EmojiPicker";


async function MessageList() {
  const messages = await prisma.chatMessage.findMany({
    select: {
      id: true,
      message: true,
      createdAt: true,
      author: { select: { image: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  console.log('this is messages:' + messages);
  return messages?messages.map((message) => (
    <div key={message.id}>
      <div>
        <span>{message.author.name}</span>
      </div>
      <div>{message.message}</div>
    </div>
  )): 'no messages';
  
}

function ShoutBox({ email }: { email: string }) {
  if(!email){  // if not logged in no form.
    return
  }
  async function sendMessage(formData: FormData) {
    "use server";
    const message = formData.get("message")?.toString() ?? "";
    if (message.length > 0 && message.length <= 400) {
      await prisma.chatMessage.create({
        data: { message, author: { connect: { email: email } } },
      });
    }

    revalidatePath("/chat");
  }

  async function refresh() {
    "use server";
    revalidatePath("/chat");
  }

  return (
    <div>
      <form
        className="flex"
        // @ts-expect-error
        action={sendMessage}
      >
        <input
          minLength={1}
          maxLength={400}
          name="message"
          className="border"
          type="text"
        />
        <button> Emoji Picker</button>
        <button className="border" type="submit">
          Send this is me..
        </button>
      </form>
      <div className="flex items-center mb-5">
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    </div>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
  <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
  <div className="mx-auto max-w-2xl lg:max-w-4xl">
    <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" />
    <figure className="mt-10">
      <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
        <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”</p>
      </blockquote>
      <figcaption className="mt-10">
        <img className="mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div className="mt-4 flex items-center justify-center space-x-3 text-base">
          <div className="font-semibold text-gray-900">Judith Black</div>
          <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-gray-900">
            <circle cx="1" cy="1" r="1" />
          </svg>
          <div className="text-gray-600">CEO of Workcation</div>
        </div>
      </figcaption>
    </figure>
  </div>
</section>
      <OnIntervalFn intervalMs={5000} fn={refresh} />
    </div>
  );
}

export default async function Chat() {
  const session = await getServerSession(authOptions);
  // @ts-expect-error
  const userEmail: string = session?.user?.email;
  return (
    <div className="container mx-auto mt-48">
      <div className="max-h-32 h-32 overflow-y-auto">
        {/* @ts-expect-error */}
        <MessageList />
      </div>
      <ShoutBox email={userEmail} />
    </div>
  );
}

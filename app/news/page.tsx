/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/client";
import NewsList from "../components/news/NewsList";
import RecentNews from "../components/news/RecentNews";
import { revalidatePath } from "next/cache";
import NewsItem from "../components/news/NewsItem";
import { redirect } from "next/navigation";

export const revalidate = 60;
export const dynamic = "force-static";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = 
    "Casino, Slot News";
  const description =
    "Online casino, slot, games news.";
  return {
    title: Title,
    description: description,
  };
}

export default async function Page() {
  // const session = await getServerSession(authOptions);
  // console.log(JSON.stringify(session?.user));
  ////@ts-expect-error
  // const userEmail: string = session?.user?.email;
  ////@ts-expect-error
  // const user: any = session?.user;
  // console.log(user);
  // // const userEmail: string = "lionmarksham@gmail.com";
  // ////@ts-expect-error
  // // const myId: string = session?.user?.id;
  // let user = await prisma.user.findFirst({
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true,
  //     image: true,
  //     role: true 
  //   },
  //   where:{
  //       email: userEmail
  //   }
  // });

  // if (!userEmail) {
  //   user = null;
  // }
  // const userRole = user?.role;
  // if(userRole && (userRole == 1 || userRole == 3)){ 
  //   redirect('/news/admin');
  // }
  // const myId: any = user?.id;
  const count = 20;

  const news = await prisma.news.findMany({
    select: {
      id: true,
      title: true,
      category: {select: {id: true, value: true}},
      description: true,
      image: true,
      author: {select: {name: true, email: true, image: true}},
      createdAt: true
    },
    orderBy:{
      createdAt:'desc'
    },
    take: count,
  });
  
  // const total = await prisma.news.count();

  const recentNews = await prisma.news.findMany({
    select: {
      id: true,
      image: true,
      title: true,
      createdAt: true,
      description: true
    },
    take: 4,
    orderBy: {
      createdAt: 'desc'
    }
  })
  return (
      <div className="md:container mx-auto text-sky-700 dark:text-white">
         <div className="mx-auto max-w-screen-lg px-3 py-6">
          <h1 className="text-3xl font-bold mb-6 flex">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
              </svg>
              &nbsp;&nbsp;News
          </h1>
          <div className="flex flex-col gap-6 pb-6">
              {news && news.length > 0 && news.map((item: any, index: number) => 
                  <div key={index} className="flex flex-col items-center gap-x-8 rounded-xl border bg-white p-3 md:flex-row">
                    <div className="shrink-0">
                    <a href={`/news/${item?.id}`}>
                        <img className="h-36 w-48 hover:translate-y-1 duration-300" src={item?.image} alt="Project Web Design" loading="lazy" />
                    </a></div>
                    <div className='w-full'>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <a className="hover:text-cyan-400" href={`/news/${item?.id}`}>
                                <h1 className="mb-6 text-2xl font-bold line-clamp-1" style={{overflowWrap: "anywhere"}}>{item?.title}</h1>
                            </a>
                        </div>
                    </div>
                    <p className="mt-3 text-semibold line-clamp-2" style={{overflowWrap: "anywhere"}}>{item?.description}</p>
                    </div>
                </div>
              )}
              {!news || news.length === 0 && 
                  <div className="px-3 pt-2 pb-6 text-center">
                      <h2 className="text-xl font-semibold">There are no News!!!</h2>
                  </div>
              }
          </div>
        </div>

        <aside aria-label="Related articles" className="bg-white dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-6 flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                &nbsp;&nbsp;Recent<span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">&nbsp;News</span> 
            </h1>
            <div className="px-4 mx-auto max-w-screen-xl">

                <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {recentNews && recentNews.length > 0 && recentNews.map((item: any) => 
                    <article 
                        key={item.id}
                        className="max-w-xs overflow-hidden rounded-xl bg-white border">
                        <a href={`/news/${item.id}`}>
                            <img src={item.image} className="mb-6 rounded-lg w-full h-48 hover:scale-105 duration-300" alt={item.title} />
                            <div className="px-3 pt-2 pb-6 text-center">
                                <h2 className="text-xl font-semibold">{item.title}</h2>
                                <div className="mt-1 text-xs text-gray-400">{item.createdAt?.toLocaleString()}</div>
                                <div className="mt-2 text-sm line-clamp-2">{item.description}</div>
                            </div>
                        </a>

                    </article>
                    )}
                </div>
                {!recentNews || recentNews.length === 0 && 
                    <div className="flex flex-col gap-6 pb-6">
                        <div className="px-3 pt-2 pb-6 text-center">
                            <h2 className="text-xl font-semibold">There are no Recent News!!!</h2>
                        </div>
                    </div>
                }
            </div>
        </aside>
      </div>
    );
}
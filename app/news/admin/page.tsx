/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/client";
import { revalidatePath } from "next/cache";
import NewsList from "@/app/components/news/NewsList";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

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
    
  const session = await getServerSession(authOptions);
  //@ts-expect-error
  const userEmail: string = session?.user?.email;
  // const userEmail: string = "lionmarksham@gmail.com";
  ////@ts-expect-error
  // const myId: string = session?.user?.id;
  let user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true 
    },
    where:{
        email: userEmail
    }
  });

  if (!userEmail) {
    user = null;
  }
  const userRole = user?.role;

  if(!userRole || (userRole !== 1 && userRole !== 3)){
    redirect('/news');
  }
  const myId: any = user?.id;
  const count = 20;

  const news = await prisma.news.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      subCategory: true,
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
  
  const total = await prisma.news.count();

  const games = await prisma.casino_p_games.findMany({
    select: {
      game_name: true,
    },
    orderBy:{
      game_name: 'asc'
    }
  })

  const slotCat = games.map(game => game.game_name);

  const casinos = await prisma.casino_p_casinos.findMany({
    select: {
      casino: true,
    },
    orderBy:{
      casino: 'asc'
    }
  })

  const casinoCat = casinos.map(casino => casino.casino);
  
  const softwares = await prisma.casino_p_software.findMany({
    select: {
      software_name: true,
    },
    orderBy:{
      software_name: 'asc'
    }
  })

  const softwareCat = softwares.map(s => s.software_name);

  const subCategories = {slotCat, casinoCat, softwareCat};

  async function getNews(category: any = "", pageNum:number=0) {
    "use server";

    try{
      const result = await prisma.news.findMany({
        select: {
          id: true,
          title: true,
          category: true,
          subCategory: true,
          description: true,
          image: true,
          author: {select: {name: true, email: true, image: true}},
          createdAt: true
        },
        orderBy:{
          createdAt: 'desc'
        },
        take: count,
        skip: pageNum * count
      });
      const total = await prisma.news.count({});

      return {
        result:result,
        total: total,
      };     
    }
    catch(error) {
      console.log(error);
      return [];
    }
  }
  
  async function updateNews (news: any) {
    "use server";

    if(!user || !myId || (user?.role != 1 && user?.role != 3))
      return null;
    try {
      let result = await prisma.news.update({
        where: {
          id: news?.id
        },
        data: {
          image: news?.image,
          title: news?.title,
          description: news?.description,
          author: {connect: {id: myId}},
          category: news?.category,
          subCategory: news?.subCategory
        }
      })
      return result;
    }
    catch(err) {
      return {
        news: news,
        author: user,
        error: err
      };
    }
    return {id: myId};
  }

  async function removeNews (news: any) {
    "use server";
    
    if(!user || !myId || (user?.role != 1 && user?.role != 3))
      return null;
    try {
      let result = await prisma.news.delete({
        where: {
          id: news?.id
        }
      });
      return result;
    }
    catch(err) {
      return {
        result: err
      };
    }
  }

  const  recentNews = await prisma.news.findMany({
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
  });

  return (
      <div className="md:container mx-auto text-sky-700 dark:text-white">

          <NewsList 
            news={news}
            total={total}
            userRole={userRole}
            recentNews={recentNews}
            subCategories={subCategories}
            getNews={getNews}
            removeNews={removeNews}
            updateNews={updateNews}
            />
        
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
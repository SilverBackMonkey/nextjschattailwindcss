/* eslint-disable @next/next/no-img-element */
import { NoAvartar } from '@/app/chat/_lib/ChatData';
import { CommentView } from '@/app/components/Comment/view';
import RecentNews from '@/app/components/news/RecentNews';
import { addComment } from '@/app/lib/CommentFetch';
import prisma from '@/client';
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 300;
export const dynamic = "force-static";

export async function generateMetadata({ params }): Promise<Metadata> {
    const props = await getProps({ params });
    const data = props.data;

    return {
      title: data?.title ?? data?.title + " Online Casino News",
      description:
        data?.description ??
        data?.title +
          " News : Casino bonus and online slots information from " +
          data?.title,
    };
}

const  getProps = async ({ params }) => {
    const slug = parseInt(params.slug);
    if(!slug)
        redirect('/news');
    const data = await prisma.news.findFirst({
        select: {
            id: true,
            title: true,
            author: {select: {id: true, email: true, name: true, image: true}},
            description: true,
            createdAt: true,
            image: true,
            comments: {
                select: {
                    id: true,
                    createdAt: true,
                    type: true,
                    content: true,
                    author: {select: {email: true, name: true, image: true}},
                }
            }
        },
        where: {
            id: {
                equals: slug
            }
        }
    });

    if(!data || !data?.id) {
        redirect('/news');
    }

    const recentNews = await prisma.news.findMany({
        select: {
            id: true,
            image: true,
            title: true,
            description: true,   
        },
        take: 4,
        orderBy: {
            createdAt: 'desc'
        }
    })
    return {data, recentNews};
}

export default async function News({ params }) {
    const props = await getProps({params});
    const data = props.data;
    
    const recentNews = props.recentNews;
    const comments = data?.comments;
    const totalCommentCount = comments?.length;
    const user = data?.author;
    return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">
                    <address className="flex items-center mb-6 not-italic">
                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                            {user?.image && <img className="mr-4 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full" src={user?.image} alt={user?.name? user.name: 'No Avatar'} />}
                            {!user?.image && 
                                <span className="rounded-full bg-yellow-500 text-white mr-4 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                                    {user?.name}
                                </span>}
                            <div>
                                <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</a>
                                <p className="text-base font-light text-gray-500 dark:text-gray-400">
                                    <time dateTime="2022-02-08" title="February 8th, 2022">{data?.createdAt.toLocaleString()}</time>
                                    </p>
                            </div>
                        </div>
                    </address>
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{data?.title}</h1>
                </header>
                <div className="flex justify-center">
                    {data?.image && <img src={data.image} alt="" className='sm:w-64 sm:h-48 md:w-80 md:h-60 lg:w-96 lg:h-72'/>}
                </div>
                
                <p style={{wordWrap: "break-word"}}>{data?.description}</p>
                {data && <CommentView
                    type={3}
                    addComment={addComment}
                    parent={data.id}
                    comments={comments}
                    totalCount={totalCommentCount}
                />}

            </article>
        </div>
        </main>
        <RecentNews />
    </div> 
   );
}

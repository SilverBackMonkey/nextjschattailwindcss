import prisma from "@/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const recentNewsFetch = async (payload) => {
    const {softwareCat, slotCat, casinoCat, count} = payload;
    const category = softwareCat ? "software": (slotCat? "slot": (casinoCat ? "casino" : undefined));
    const subCat = softwareCat || slotCat || casinoCat;
    let subCategory ;
    try{
      if(category ==  'software'){
        const software = await prisma.casino_p_software.findFirst({
          select: {
            software_name: true
          },
          where: {
            link: subCat
          }
        });
        subCategory = software?.software_name;
      }
      if(category ==  'casino'){
        const casino = await prisma.casino_p_casinos.findFirst({
          select: {
            casino: true
          },
          where: {
            clean_name: subCat
          }
        });
        subCategory = casino?.casino;
      }
      if(category ==  'slot'){
        const slot = await prisma.casino_p_games.findFirst({
          select: {
            game_name: true
          },
          where: {
            game_clean_name: subCat
          }
        });
        subCategory = slot?.game_name;
      }
      if(category) {
        const news = await prisma.news.findMany({
            select: {
              id: true,
              title: true,
              description: true,
              image: true,
              createdAt: true
            },
            where: {
                category: category,
                subCategory: subCategory
            },
            orderBy:{
              createdAt:'desc'
            },
            take: count,
          });
        return {
          news: news,
          subCategory: subCategory
        };
      }
      else {
        const news = await prisma.news.findMany({
          select: {
            id: true,
            title: true,
            description: true,
            image: true,
            createdAt: true
          },
          orderBy:{
            createdAt:'desc'
          },
          take: count,
        });
        return {
          news: news,
          subCategory: ''
        };
      }
    }
    catch(error) {
        console.log(error);
        return {
          news: [],
          subCategory: subCategory
        };    
      }
}

export async function addNews (data: any) {
    "use server";

    const session = await getServerSession(authOptions);
    //@ts-expect-error
    const userEmail: string = session?.user?.email;

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
    
    const myId: any = user?.id;

    if(!user || !myId || (user?.role != 1 && user?.role != 3))
      return null;
   
    try {
      let result = await prisma.news.create({
        data:{
          title: data?.title,
          author: {connect: {id: myId}},
          category: data?.category,
          subCategory: data?.subCategory,
          description: data?.description,
          image: data?.image,
        }
      });
      return {id: result?.id};
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }

  export async function updateNews (news: any) {
    "use server";

    const session = await getServerSession(authOptions);
    //@ts-expect-error
    const userEmail: string = session?.user?.email;

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
    
    const myId: any = user?.id;

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
        return true;
      }
      catch(err) {
        console.log(err);
        return false;
      }
  }
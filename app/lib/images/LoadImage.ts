import prisma from "@/client";
/**
 * 
 * type = 0: casino homescreen 
 * type = 1: casino icons
 * type = 2: slot icons
 */

export const LoadImage = async (img, type) => {
    let result;
    if(type == 0) {
        const cleanName = img.split('-homescreen')[0];
        const casino = await prisma.casino_p_casinos.findFirst({
            select: {
                vercel_image_url: true
            },
            where: {
                clean_name: cleanName
            }
        });
        result = casino?.vercel_image_url;
    }
    else if(type == 1) {
        const casino = await prisma.casino_p_casinos.findFirst({
            select: {
                vercel_casino_button: true
            },
            where: {
                button: img
            }
        });

        result = casino?.vercel_casino_button;
    }
    else if(type == 2) {
        const slot = await prisma.casino_p_games.findFirst({
            select: {
                vercel_image_url: true
            },
            where: {
                game_image: img
            }
        });
        
        result = slot?.vercel_image_url;
    }

    console.log("this is img")
    const blob = await fetch(result).then(res => res.blob());
    // const blob = await fetch("https://e4tchmxe7stjffhy.public.blob.vercel-storage.com/12_celebrityinthejungle-jRckc2pG14xSPliNZAKEcpaoYheWv0.png").then(res => res.blob());
    return {
        blob: blob
    };
}
import prisma from "@/client";
import { list, del } from "@vercel/blob";

export const RemoveImages = async () => {        
	"use server";
    
    const {blobs} = await list({
        token: process.env.BLOB_READ_WRITE_TOKEN,
        limit:500
    });
    
    const updatedcasinos = await prisma.casino_p_casinos.updateMany({
        data: {
            vercel_image_url: null,
            vercel_casino_button: null
        },
        where: {
            OR: [
                {
                    vercel_casino_button: {
                        not: null
                    }
                },
                {
                    vercel_image_url: {
                        not: null
                    }
                }
            ]
        },
    })

    blobs.map(async (b: any) => {
        await del(b.url, {
            token: process.env.BLOB_READ_WRITE_TOKEN
        });
    });

    const updatedGames = await prisma.casino_p_games.updateMany({
        data: {
            vercel_image_url: null,
        },
        where: {
            vercel_image_url: {
                not: null
            }
        }
    });

    return {
        success: "removed",
        blobs: blobs,
        updatedcasinos,
        updatedGames
    }
}
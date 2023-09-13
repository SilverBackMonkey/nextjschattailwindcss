import prisma from "@/client"
import Image from "next/legacy/image";

import { del, head, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import UploadToVercel from "../components/vercel-blob/UploadToVercel";
import { uploadGameImages } from "../lib/UploadImages";
import { RemoveImages } from "../lib/vercel-store/RemoveImages";


export default async function ImageList () {
    "use server";
    let games = await prisma.casino_p_games.findMany({
        select: {
            game_id: true,
            game_clean_name: true,
            game_image: true,
        },
        where:{
            vercel_image_url: null
        },
        take: 100
    });
    let totalGameCount = await prisma.casino_p_games.count();
    let savedGameCount = await prisma.casino_p_games.count({
        where: {
            vercel_image_url: {
                not: null
            }
        }
    });
    let savedGames = await prisma.casino_p_games.findMany({
        select: {
            game_id: true,
            game_image: true,
            vercel_image_url: true
        },
        where:{
            vercel_image_url: {
                not: null
            }
        },
        orderBy:{
            game_updated: 'desc'
        },
        take: 30
    });
    let savedCount = await prisma.casino_p_casinos.count({
        where:{
            AND:[
                {
                    vercel_image_url: {
                        not: null
                    }
                },
                {
                    vercel_image_url: {
                        not: ''
                    }
                }
            ]
        }
    });
    let casinos = await prisma.casino_p_casinos.findMany({
        where:{
            AND:[
                {
                    vercel_image_url: {
                        not: null
                    }
                },
                {
                    vercel_image_url: {
                        not: ''
                    }
                }
            ]
        },
        select:{
            id: true,
            clean_name: true,
            vercel_image_url: true,
            button: true,
            vercel_casino_button: true,
        }
    });
    const blob1 = await list({
        token: process.env.BLOB_READ_WRITE_TOKEN,
        limit:10
    });
    const upload = async (games) => {
        "use server";
        if(games && games.length > 0) {
            const result1 : any = [];
            console.log(games);
            games.map(async (g : any) => {
                if(g.game_image != '' && g.game_image != null) {
                    const img = 'https://www.allfreechips.com/image/sloticonssquare/'+ g.game_image;

                    const response = await fetch(img, { method: 'HEAD' });
                    if(response.status == 200) {
                        // push file in buffer
                        result1.push('head fetch');
                        let file = await fetch(img)
                        .then(res  => res.blob())
                        // save blob in vercel
                        const blob = await put(g.game_image, file, {
                            access: 'public',
                            token: process.env.BLOB_READ_WRITE_TOKEN
                        });
                        result1.push('db');

                        // update the database
                        const result = await prisma.casino_p_games.update({
                            data: {
                                vercel_image_url: blob.url
                            },
                            where: {
                                game_id: g.game_id
                            }
                        });

                        result1.push('result');
                    }
                }
            });
            return {result1};
        }
    }

    const deleteImage = async () => {
        "use server";

        const result0 = await prisma.casino_p_casinos.updateMany({
            data:{
                vercel_casino_button: null,
                vercel_image_url: null
            }
        });

        const result1 = await prisma.casino_p_games.updateMany({
            data: {
                vercel_image_url: null
            }
        });

    }
    const count1 = await prisma.casino_p_casinos.count({
        where: {
            vercel_image_url: {
                not: null
            }
        }
    });
    const count2 = await prisma.casino_p_casinos.count({
        where: {
            vercel_casino_button: {
                not: null
            }
        }
    });
    
    const testUpload = async () => {
        "use server";

        const testCasinos = await prisma.casino_p_casinos.findMany({
            select: {
                id: true,
                clean_name: true,
                button: true
            },
            where: {
                vercel_casino_button: null,
                approved: 1,
                rogue: 0
            },
            take: 10
        });

        let result:any = [];

        if(testCasinos && testCasinos.length > 0) {
          
            result.push({"initiliazed":0});
            testCasinos.map(async (c : any) => {

                if(c.button != '' && c.button != null) {
                    let img = "https://www.allfreechips.com/image/casinoiconscut/" + c.button;
                    result.push(img);
                    try{
                        const response = await fetch(img, { method: 'HEAD' });
                        if(response.status == 200) {
                            // push file in buffer  https://www.allfreechips.com/image/hp/drake-homescreen.jpg
                            let file = await fetch(img)
                            .then(res  => res.blob());
                            // save blob in vercel
                            const blob = await put("scatters.png", file, {
                                access: 'public',
                                token: process.env.BLOB_READ_WRITE_TOKEN
                            });

                            // update the database
                            const res = await prisma.casino_p_casinos.update({
                                        data: {
                                            vercel_casino_button: blob.url
                                        },
                                        where: {
                                            id: c.id
                                        }
                                    });
                        }
                    }
                    catch(error) {
                        result.push(JSON.stringify(error));
                    }    
                }
            });
        }
        return {
            result,
            testCasinos
        };
    }

    return (
        <div className="md:container mx-auto text-sky-700 dark:text-white">
            <div className="md:px-24 py-8 text-center mt-2 p-2">
                <h2 className="text-3xl font-semibold px-8 md:text-6xl md:">
                    In &nbsp;{totalGameCount}&nbsp; Games, &nbsp; {savedGameCount} Images has been saved currently .
                </h2>
                
                <img src="/images/casino/homescreen/all-jackpots-homescreen.jpg" />
                <img src="/images/casino/homescreen/palace-of-chance-homescreen.jpg" />
                <img src="/images/casino/icons/crc.png" />
                <img src="/images/casino/icons/firstweb.png" />
                <img src="/images/slot/nyx-20000-leagues.png" />
                <img src="/images/slot/5reeldrive_c.png" />
                
                <h3>
                    casinos homescreen saved: {count1}&nbsp;casinos... <br/>
                    casinos icons saved: {count2}&nbsp;casinos...
                </h3>
                <ul className="list-decimal">
                    {blob1.blobs.map((b: any, index: number) =>
                    <li className="py-2" key={index}>
                        <Image
                            unoptimized
                            alt="image"
                            width={240}
                            height={160}
                            src={b.url} />
                        <div className="text-bold">
                            <p className="text-base">game image:&nbsp;</p>{b.pathname}
                        </div>
                    </li>)}
                </ul>
                <UploadToVercel onUpload={upload} onDelete={deleteImage} games={games} savedGames={savedGames} uploadImages={uploadGameImages}/>
            </div>
        </div>
    )
}
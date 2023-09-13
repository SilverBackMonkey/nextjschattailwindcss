import prisma from "@/client";
import { put } from "@vercel/blob";

export const uploadGameImages = async () => {
    "use server";

    let error0;
    let error1;
    let error2;
    let result1: any = [];
    let result2: any = [];
    let result3: any = [];
    const games = await prisma.casino_p_games.findMany({
        select: {
            game_id: true,
            game_image: true,
        },
        where: {
            AND: [
                {
                    vercel_image_url: null   
                },
                {
                    game_image: {
                        not: ''
                    }
                }
            ]
        },
        take: 200
    });
    
    if(games && games.length > 0) {
        
        games.map(async (g : any) => {
            if(g.game_image != '' && g.game_image != null) {
                // push file in buffer
                const img = `https://www.allfreechips.com/image/sloticonssquare/${encodeURIComponent(
                    g.game_image
                )}`;
                
                result1.push('img')
                const response = await fetch(img, { method: 'HEAD' });
                result1.push('head fetch')
                if(response.status == 200) {
                    result1.push('fetch true')
                    try{
                        let file = await fetch(img)
                        .then(res  => res.blob())
                        result1.push('file')
                        // save blob in vercel
                        const blob = await put(g.game_image, file, {
                            access: 'public',
                            token: process.env.BLOB_READ_WRITE_TOKEN
                        });
                        result1.push('blob')
                        // update the database
                        if(blob != null && blob != undefined){
                            result1.push('db')
                            const result = await prisma.casino_p_games.update({
                                data: {
                                    vercel_image_url: blob.url
                                },
                                where: {
                                    game_id: g.game_id
                                }
                            });
                            result1.push('updated')
                        }
                    }
                    catch(error) {
                        result1.push(JSON.stringify(error));
                    }
                }
            }
        });
    }
    const casinos1 = await prisma.casino_p_casinos.findMany({
        select: {
            id: true,
            clean_name: true
        },
        where: {
            vercel_image_url: null,
            approved: 1,
            rogue: 0
        },
        take: 150
    });


    if(casinos1 && casinos1.length > 0) {
      
        result2.push({"initiliazed":0});
        casinos1.map(async (c : any) => {

                if(c.clean_name != '' && c.clean_name != null) {
                    let img = "https://www.allfreechips.com/image/hp/" + c.clean_name + "-homescreen.jpg";
                    result2.push(img);
                    try{
                        result2.push('head');
                        const response = await fetch(img, { method: 'HEAD' });
                        result2.push('fetch');
                        if(response.status == 200) {
                            result2.push('fetch true');
                            // push file in buffer  https://www.allfreechips.com/image/hp/drake-homescreen.jpg
                            let file = await fetch(img)
                            .then(res  => res.blob());
                            result2.push('file');
                            // save blob in vercel
                            const blob = await put(c.clean_name + "-homescreen.jpg", file, {
                                access: 'public',
                                token: process.env.BLOB_READ_WRITE_TOKEN
                            });
                            result2.push('db');
                            // update the database
                            const res = await prisma.casino_p_casinos.update({
                                data: {
                                    vercel_image_url: blob.url
                                },
                                where: {
                                    id: c.id
                                }
                            });
                            result2.push('updated');
                        }
                    }
                    catch(error) {
                        result2.push(JSON.stringify(error));
                    }
                }
        });
    }

    const casinos2 = await prisma.casino_p_casinos.findMany({
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
        take: 150
    });

    if(casinos2 && casinos2.length > 0) {
      
        result2.push({"initiliazed":0});
        casinos2.map(async (c : any) => {

            if(c.button != '' && c.button != null) {
                let img = "https://www.allfreechips.com/image/casinoiconscut/" + c.button;
                result2.push(img);
                try{
                    const response = await fetch(img, { method: 'HEAD' });
                    if(response.status == 200) {
                        // push file in buffer  https://www.allfreechips.com/image/hp/drake-homescreen.jpg
                        let file = await fetch(img)
                        .then(res  => res.blob());
                        // save blob in vercel
                        const blob = await put(c.button, file, {
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
                    result2.push(JSON.stringify(error));
                }    
            }
        });
    }

    return {
        success: true,
        error0,
        error1,
        error2,
        games,
        casinos1,
        casinos2,
        result1,
        result2,
        result3
    }
}
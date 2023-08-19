import prisma from "@/client";
import {cookies} from 'next/headers';

export const registEmail = async (email) => {
    "use server";

    try {
        const data = await prisma.guest.create({
            data: {
                email: email
            }
        });
        cookies().set("isAuthenticated", "true",{ expires: Date.now() + 24 * 60 * 60 * 1000 });
        cookies().set("email", email,{ expires: Date.now() + 24 * 60 * 60 * 1000 });

        return data;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

export const isExist = async (email) => {
    "use server";

    try {
        const data = await prisma.guest.findFirst({
            select: {
                email: email
            }
        });
        
        if(data){
            cookies().set("isAuthenticated", "true",{ expires: Date.now() - 24 * 60 * 60 * 1000 });
            cookies().set("email", email,{ expires: Date.now() - 24 * 60 * 60 * 1000 });    
        }

        return data;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

export async function isAuthenticated() {
    "use server";
    const auth: any = cookies().get("isAuthenticated");
    const email: any = cookies().get("email");

    return {
        isAuthenticated: auth?.value, 
        email: email?.value
    };
}
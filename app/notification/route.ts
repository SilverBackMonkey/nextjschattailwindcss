import { removeItemfromNotificationlist, replyMessage } from "@/app/lib/NotificationFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    if(req.method !== "POST") {
        return NextResponse.json({status: 405});
    }

    const {toEmail, message, email, name, replyedId} = await req.json();

    const result = await replyMessage({message, toEmail, email, name, replyedId});
    if(result){
        return NextResponse.json({status: 200});
    }
    return NextResponse.json({status: 500});
}
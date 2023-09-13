import { LoadImage } from "@/app/lib/images/LoadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const image = req.nextUrl.pathname.split('/')[4];
    console.log(image);
    const {blob} = await LoadImage(image, 0);
    const headers = new Headers();

    headers.set("Content-Type", "image/*");
    
    // or just use new Response ❗️
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
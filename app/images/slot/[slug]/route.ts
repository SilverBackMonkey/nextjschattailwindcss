import { LoadImage } from "@/app/lib/images/LoadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const image = req.nextUrl.pathname.split('/')[3];
    const {blob} = await LoadImage(image, 2);
    const headers = new Headers();

    headers.set("Content-Type", "image/*");
    
    // or just use new Response ❗️
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
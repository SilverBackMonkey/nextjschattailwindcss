import { getCount, searchData } from "@/app/lib/SearchFetch";
import { uploadGameImages } from "@/app/lib/UploadImages";
import { RemoveImages } from "@/app/lib/vercel-store/RemoveImages";
import { NextResponse } from "next/server";
export const revalidate = 0
export async function GET(req: Request) {
    const result = await RemoveImages();
    return NextResponse.json({
        result:result
    });
}
import { NextRequest, NextResponse } from "next/server";
import { registEmail } from "../lib/RegistEmail";

export async function POST(req: NextRequest, res: NextResponse) {
    if(req.method !== "POST") {
        return NextResponse.json({status: 405});
    }

    const {email} = await req.json();

    const result = await registEmail(email);
    if(result){
        return NextResponse.json({status: 200});
    }
    return NextResponse.json({status: 500});
}
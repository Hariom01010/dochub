import { LoginUserSchema } from "@/schemas/auth.schema";
import { loginUser } from "@/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    try {
        const body = await request.json();
        const validatedData = LoginUserSchema.parse(body)

        const token = await loginUser(validatedData)
        cookieStore.set("dochub", token, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60*60*24*3
        })

        return NextResponse.json({
            message: 'Login Successful'
        })
    } catch(error){
        return NextResponse.json({
            message: error instanceof Error? error.message: 'Internal Server Error',
        },
        {
            status: 400
        })
    }
}
import { CreateUserSchema } from "@/schemas/user.schema";
import { createUser } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
    const body = await req.json();
    const validatedData = CreateUserSchema.parse(body);

    const user = await createUser(validatedData)
    return NextResponse.json({
        success: true,
        data: user
    }, {status: 201})
    } catch(error) {
        return NextResponse.json({
            error: error instanceof Error? error.message: "Something went wrong",
        }, {status: 400})
    }
}
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserToken } from "@/types/user";
import { getUserWorkspaces } from "@/services/workspace.service";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("dochub")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is missing");
    }

    const payload = jwt.verify(token, secret) as UserToken;

    const workspaces = await getUserWorkspaces(payload.userId);

    return NextResponse.json({ workspaces }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

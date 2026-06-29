import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserToken } from "@/types/user";
import {
  createWorkspace,
  getUserWorkspaces,
} from "@/services/workspace.service";
import { CreateWorkspaceSchema } from "@/schemas/workspace.schema";
import verifyToken from "@/lib/auth";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = CreateWorkspaceSchema.parse(body);

    const token = req.cookies.get("dochub")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = verifyToken(token);

    const workspace = await createWorkspace(user.userId, payload);
    return NextResponse.json(
      { mesage: "Workspace created successfully", data: workspace },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

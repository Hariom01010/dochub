import { WorkspaceMember } from "@/types/workspace";
import { Prisma } from "../../generated/prisma/client";

export async function insertMember(tx: Prisma.TransactionClient,data: WorkspaceMember) {
    const {userId, role, workspaceId} = data;
    const member = await tx.workspaceMember.create({
        data: {
            role,
            userId,
            workspaceId
        }
    })
    return member;
}
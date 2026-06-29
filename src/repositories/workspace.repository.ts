import { prisma } from "@/lib/prisma";
import { CreateWorkspace } from "@/types/workspace";
import { Prisma } from "../../generated/prisma/client";

export async function findWorkspaceByUserId(userId: string) {
  const workspaces = await prisma.workspaceMember.findMany({
    where: { userId },
    include: {
        workspace: true
    }
  });

  return workspaces
}


export async function insertWorkspace(tx: Prisma.TransactionClient, data: CreateWorkspace) {
  const {name, type} = data
  const workspace = await tx.workspace.create({
    data: {
      name,
      type,
    }
  })
  return workspace
}
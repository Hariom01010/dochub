import { prisma } from "@/lib/prisma";

export async function findWorkspaceByUserId(userId: string) {
  const workspaces = await prisma.workspaceMember.findMany({
    where: { userId },
    include: {
        workspace: true
    }
  });

  return workspaces
}

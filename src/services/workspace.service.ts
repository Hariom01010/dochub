import {
  findWorkspaceByUserId,
  insertWorkspace,
} from "@/repositories/workspace.repository";
import { CreateWorkspace } from "@/types/workspace";
import { WorkspaceRole, WorkspaceType } from "../../generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { insertMember } from "@/repositories/workspacemember.repository";
import { getUserByIds } from "@/repositories/user.repository";

export async function getUserWorkspaces(userId: string) {
  const workspaces = await findWorkspaceByUserId(userId);
  console.log(workspaces);
}

export async function createWorkspace(ownerId: string, data: CreateWorkspace) {
  if (data.type === WorkspaceType.PERSONAL && data.members.length > 0) {
    throw new Error("A personal workspace cannot have additional members.");
  }
  if (data.type === WorkspaceType.TEAM && data.members.length === 0) {
    throw new Error("A team workspace must have at least one member.");
  }
  const uniqueMembers = [...new Set(data.members)];
  if (uniqueMembers.length !== data.members.length) {
    throw new Error("Duplicate Members are not allowed");
  }

  if (data.members.includes(ownerId)) {
    throw new Error("Owner cannot be added as member.");
  }
  const users = await getUserByIds(uniqueMembers);
  if (users.length !== uniqueMembers.length) {
    throw new Error("One or more members do not exist.");
  }
  const workspace = await prisma.$transaction(async (tx) => {
    const workspace = await insertWorkspace(tx, data);
    await insertMember(tx, {
      userId: ownerId,
      role: WorkspaceRole.OWNER,
      workspaceId: workspace.id,
    });
    for (const memberId of uniqueMembers) {
      await insertMember(tx, {
        userId: memberId,
        role: WorkspaceRole.MEMBER,
        workspaceId: workspace.id,
      });
    }
    return workspace;
  });
  return workspace;
}

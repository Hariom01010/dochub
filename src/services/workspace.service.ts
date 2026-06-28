import { findWorkspaceByUserId } from "@/repositories/workspace.repository"
export async function getUserWorkspaces(userId: string) {
    const workspaces = await findWorkspaceByUserId(userId)
    console.log(workspaces)
}
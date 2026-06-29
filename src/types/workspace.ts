import { WorkspaceRole, WorkspaceType } from "../../generated/prisma/enums";

export interface CreateWorkspace{
    name: string,
    type: WorkspaceType,
    members: string[]
}

export interface WorkspaceMember{
    userId: string;
    role: WorkspaceRole;
    workspaceId: string;
}
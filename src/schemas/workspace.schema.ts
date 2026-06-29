import z from "zod";
import { WorkspaceType } from "../../generated/prisma/enums";

export const CreateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Workspace name must be at least 3 characters.")
    .max(50, "Workspace name cannot exceed 50 characters."),
  type: z.enum(WorkspaceType),
  members: z.array(z.uuid("Invalid Member ID.")).default([])
});

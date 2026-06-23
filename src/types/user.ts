import { UserRole } from "../../generated/prisma/enums";

export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string
    role: UserRole
}
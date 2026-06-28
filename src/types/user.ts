import { UserRole } from "../../generated/prisma/enums";
import { JwtPayload } from "jsonwebtoken";
export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string
    role: UserRole
}

export interface UserToken extends JwtPayload {
    firstName: string;
    lastName: string;
    userId: string;
    email: string;
    role: UserRole;
}
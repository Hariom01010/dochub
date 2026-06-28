import {
  getUserByEmail,
  createUser as createUserRepo,
} from "@/repositories/user.repository";
import { LoginUserInput, RegisterUserInput } from "@/schemas/auth.schema";
import { UserRole } from "../../generated/prisma/enums";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (data: RegisterUserInput) => {
  const user = await getUserByEmail(data.email);
  if (user) {
    throw new Error("User Already Exists!");
  }
  const passwordHash = await bcrypt.hash(
    data.password,
    Number(process.env.SALT_ROUNDS),
  );
  const userData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwordHash: passwordHash,
    role: UserRole.USER,
  };
  const res = await createUserRepo(userData);
  return res;
};

export const loginUser = async (data: LoginUserInput) => {
  const user = await getUserByEmail(data.email);
  if (!user) {
    throw new Error(`Invalid Credentials`);
  }
  if (!user.passwordHash) {
    throw new Error(
      `This account uses social login. Please sign in with google.`,
    );
  }
  const passwordMatch = await bcrypt.compare(data.password, user.passwordHash);
  if (!passwordMatch) {
    throw new Error("Invalid Credentials");
  }
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  const token = jwt.sign(
    { firstName: user.firstName, lastName: user.lastName, userId: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: "3d" },
  );
  return token;
};

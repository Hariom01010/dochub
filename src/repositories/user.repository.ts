import { prisma } from "@/lib/prisma";
import { CreateUser } from "@/types/user";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};
export const getUserByIds = async (ids: string[]) => {
  const user = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
    },
  });
  return user;
};

export const createUser = async (data: CreateUser) => {
  const user = await prisma.user.create({
    data: data,
  });
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
};

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = globalThis as {
    prisma?: PrismaClient
}
const pgAdapter = new PrismaPg({connectionString: process.env.DATABASE_URL})

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter: pgAdapter
});

if(process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
//import { PrismaClient } from "@prisma/client";

//export const prisma = new PrismaClient({});

// import { PrismaClient } from '@prisma/client'

// declare global {
//     // eslint-disable-next-line no-var
//     var prisma: PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
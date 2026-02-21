import { PrismaClient } from "@prisma/client";

// On stocke l'instance dans globalThis pour éviter les doublons en dev
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // optionnel
  });

// En développement, on garde l'instance en mémoire
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

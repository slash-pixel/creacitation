import "dotenv/config";
import { defineConfig } from "@prisma/config"; // vérifie que le package est bien installé

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
});

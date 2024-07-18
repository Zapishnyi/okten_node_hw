import path from "node:path";

export const dbFile: string = path.join(
  process.cwd(),
  "/src/db",
  "users.db.ts",
);

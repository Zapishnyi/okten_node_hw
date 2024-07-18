import fsSync from "node:fs";
import fsAsync from "node:fs/promises";

import { dbFile } from "../constants/dbPath";
import IUser from "../models/IUser";

class DBService {
  public async read(): Promise<IUser[]> {
    return fsSync.existsSync(dbFile)
      ? JSON.parse(await fsAsync.readFile(dbFile, "utf-8"))
      : [];
  }

  public async write(fileContent: IUser[]): Promise<void> {
    await fsAsync.writeFile(dbFile, JSON.stringify(fileContent));
  }
}

export const { read, write } = new DBService();

import * as bcrypt from "bcrypt";

class HashService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 7);
  }

  public async compare(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}

export const hashService = new HashService();

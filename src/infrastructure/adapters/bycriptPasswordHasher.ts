import type { PasswordHasher } from "../../application/ports/passwordHasher";
import * as bcryptjs from "bcryptjs";

export class BycriptPasswordHasher implements PasswordHasher {
  async hash(plainText: string): Promise<string> {
    const saltRounds = 10;
    return await bcryptjs.hash(plainText, saltRounds);
  }
  async compare(plainText: string, hashed: string): Promise<boolean> {
    return await bcryptjs.compare(plainText, hashed);
  }
}

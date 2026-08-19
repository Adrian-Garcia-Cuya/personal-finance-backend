import type { TokenGenerator } from "../ports/tokenGenerator";
import * as jwt from "jsonwebtoken";

export class JwtTokenGenerator implements TokenGenerator {
  generate(userId: string, email: string): string {
    const payload = {
      userId,
      email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  }
}

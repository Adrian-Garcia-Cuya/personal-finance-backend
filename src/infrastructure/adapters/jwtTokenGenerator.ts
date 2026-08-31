import * as jwt from "jsonwebtoken";
import type { TokenGenerator } from "../ports/tokenGenerator";

export const jwtTokenGenerator: TokenGenerator = {
  generate(userId: string, email: string): string {
    const payload = {
      userId,
      email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  },

  verify(token: string): string {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
      email: string;
    };

    return decodedToken.userId;
  },
};

import { jwtTokenGenerator } from "@/infrastructure/adapters/jwtTokenGenerator";
import type { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const authorization = c.req.header("Authorization");
  if (!authorization) {
    return c.json(
      {
        success: false,
        message: "Authorization header is required",
      },
      401,
    );
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return c.json(
      {
        success: false,
        message: "Token not found",
      },
      401,
    );
  }

  const userId = jwtTokenGenerator.verify(token);
  if (!userId) {
    return c.json(
      {
        success: false,
        message: "Invalid token",
      },
      401,
    );
  }

  c.set("userId", userId);

  await next();
};

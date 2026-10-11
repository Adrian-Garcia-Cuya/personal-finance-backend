import { Hono } from "hono";
import type { AuthController } from "./auth.controller";

export const createAuthRouter = (controller: AuthController) => {
  const authRouter = new Hono();

  authRouter.post("/login", ...controller.login);
  authRouter.post("/register", ...controller.register);

  return authRouter;
};

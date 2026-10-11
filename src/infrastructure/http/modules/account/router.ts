import { Hono } from "hono";
import type { AccountController } from "./account.controller";

export const createAccountRouter = (controller: AccountController) => {
  const accountRouter = new Hono();

  accountRouter.get("/", ...controller.findAll);
  accountRouter.post("/", ...controller.create);

  return accountRouter;
};

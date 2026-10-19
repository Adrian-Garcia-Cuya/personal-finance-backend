import { Hono } from "hono";
import type { TransactionController } from "./transaction.controller";

export const createTransactionRouter = (controller: TransactionController) => {
  const transactionRouter = new Hono();

  transactionRouter.get("/registration-form", ...controller.getFormData);
  transactionRouter.post("/", ...controller.create);

  return transactionRouter;
};

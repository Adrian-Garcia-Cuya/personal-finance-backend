import { Hono } from "hono";
import type { TransactionController } from "./transaction.controller";

export const createTransactionRouter = (controller: TransactionController) => {
  const transactionRouter = new Hono();

  transactionRouter.get("/registration-form", ...controller.getFormData);
  transactionRouter.get("/summary", ...controller.getSummary);
  transactionRouter.get("/charts/income-expense", ...controller.getMonthlyIncomeExpense);
  transactionRouter.get("/charts/expenses-by-category", ...controller.getExpensesByCategory);
  transactionRouter.get("/", ...controller.findAll);
  transactionRouter.post("/", ...controller.create);

  return transactionRouter;
};

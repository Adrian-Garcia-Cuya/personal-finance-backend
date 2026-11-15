import { factory } from "../../factory";
import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import { CreateTransactionSchema } from "../../schemas/transaction/create-transaction.schema";
import { TransactionPeriodSchema } from "../../schemas/transaction/transaction-period.schema";
import { TransactionMonthSchema } from "../../schemas/transaction/transaction-month.schema";
import type { GetMonthlyIncomeExpenseUseCase } from "@/application/useCases/transaction/get-monthly-income-expense.use-case"
import type { CreateTransactionUseCase } from "@/application/useCases/transaction/create-transaction.use-case";
import type { GetRegistrationFormUseCase } from "@/application/useCases/transaction/get-registration-form.use-case";
import type { GetAllTransactionsUseCase } from "@/application/useCases/transaction/get-all-transactions.use-case";
import type { GetTransactionSummaryUseCase } from "@/application/useCases/transaction/get-transaction-summary.use-case";

export class TransactionController {
  constructor(
    private readonly getRegistrationFormUseCase: GetRegistrationFormUseCase,
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getAllTransactionsUseCase: GetAllTransactionsUseCase,
    private readonly getTransactionSummaryUseCase: GetTransactionSummaryUseCase,
    private readonly getMonthlyIncomeExpenseUseCase: GetMonthlyIncomeExpenseUseCase,
  ) {}

  create = factory.createHandlers(
    schemaValidator("json", CreateTransactionSchema.array()),
    async (c) => {
      const body = c.req.valid("json");
      const userId = c.get("userId");
      const results = [];

      for (const transaction of body) {
        results.push(await this.createTransactionUseCase.execute({
          ...transaction,
          userId,
        }));
      }

      return c.json(results, 201);
    },
  );

  findAll = factory.createHandlers(
    schemaValidator("query", TransactionPeriodSchema),
    async (c) => {
      const userId = c.get("userId");
      const period = c.req.valid("query");
      const data = await this.getAllTransactionsUseCase.execute(userId, period);

      return c.json({ success: true, data }, 200);
    },
  );

  getSummary = factory.createHandlers(
    schemaValidator("query", TransactionPeriodSchema),
    async (c) => {
      const userId = c.get("userId");
      const period = c.req.valid("query");
      const data = await this.getTransactionSummaryUseCase.execute(
        userId,
        period,
      );

      return c.json({ success: true, data }, 200);
    },
  );

  getMonthlyIncomeExpense = factory.createHandlers(
    schemaValidator("query", TransactionMonthSchema),
    async (c) => {
      const userId = c.get("userId");
      const { month } = c.req.valid("query");
      const data = await this.getMonthlyIncomeExpenseUseCase.execute(userId, month);
      return c.json({ success: true, data }, 200);
    },
  );

  getFormData = factory.createHandlers(async (c) => {
    const userId = c.get("userId");

    const result = await this.getRegistrationFormUseCase.execute(userId);

    return c.json(result, 200);
  });
}

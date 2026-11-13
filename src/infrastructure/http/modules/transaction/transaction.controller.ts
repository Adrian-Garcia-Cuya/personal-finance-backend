import { factory } from "../../factory";
import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import { CreateTransactionSchema } from "../../schemas/transaction/create-transaction.schema";
import { TransactionPeriodSchema } from "../../schemas/transaction/transaction-period.schema";
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
  ) {}

  create = factory.createHandlers(
    schemaValidator("json", CreateTransactionSchema),
    async (c) => {
      const body = c.req.valid("json");
      const userId = c.get("userId");
      const result = await this.createTransactionUseCase.execute({
        ...body,
        userId,
      });

      return c.json(result, 201);
    },
  );

  findAll = factory.createHandlers(async (c) => {
    const userId = c.get("userId");
    const data = await this.getAllTransactionsUseCase.execute(userId);

    return c.json({ success: true, data }, 200);
  });

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

  getFormData = factory.createHandlers(async (c) => {
    const userId = c.get("userId");

    const result = await this.getRegistrationFormUseCase.execute(userId);

    return c.json(result, 200);
  });
}

import { factory } from "../../factory";
import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import { CreateTransactionSchema } from "../../schemas/transaction/create-transaction.schema";
import type { CreateTransactionUseCase } from "@/application/useCases/transaction/create-transaction.use-case";
import type { GetRegistrationFormUseCase } from "@/application/useCases/transaction/get-registration-form.use-case";

export class TransactionController {
  constructor(
    private readonly getRegistrationFormUseCase: GetRegistrationFormUseCase,
    private readonly createTransactionUseCase: CreateTransactionUseCase,
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

  getFormData = factory.createHandlers(async (c) => {
    const userId = c.get("userId");

    const result = await this.getRegistrationFormUseCase.execute(userId);

    return c.json(result, 200);
  });
}

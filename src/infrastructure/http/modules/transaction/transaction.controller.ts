import type { GetRegistrationFormUseCase } from "@/application/useCases/transaction/get-registration-form.use-case";
import type { Context } from "hono";

export class TransactionController {
  constructor(
    private readonly getRegistrationFormUseCase: GetRegistrationFormUseCase,
  ) {}

  getFormData = async (c: Context) => {
    const userId = c.get("userId") as string;

    const result = await this.getRegistrationFormUseCase.execute(userId);

    return c.json(result, 200);
  };
}

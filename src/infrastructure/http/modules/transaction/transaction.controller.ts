import { factory } from "../../factory";
import type { GetRegistrationFormUseCase } from "@/application/useCases/transaction/get-registration-form.use-case";

export class TransactionController {
  constructor(
    private readonly getRegistrationFormUseCase: GetRegistrationFormUseCase,
  ) {}

  getFormData = factory.createHandlers(async (c) => {
    const userId = c.get("userId");

    const result = await this.getRegistrationFormUseCase.execute(userId);

    return c.json(result, 200);
  });
}

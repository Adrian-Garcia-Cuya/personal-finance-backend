import { CreateAccountSchema } from "../../schemas/account/create-account.schema";
import { factory } from "../../factory";
import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import type { CreateAccountUseCase } from "@/application/useCases/account/create-account.use-case";
import type { GetAllAccountsUseCase } from "@/application/useCases/account/get-all-accounts.use-case";

export class AccountController {
  constructor(
    private accountUseCase: CreateAccountUseCase,
    private getAllAccountsUseCase: GetAllAccountsUseCase,
  ) {}

  create = factory.createHandlers(
    schemaValidator("json", CreateAccountSchema),
    async (c) => {
      const body = c.req.valid("json");
      const userId = c.get("userId");

      const data = {
        ...body,
        userId,
      };
      const result = await this.accountUseCase.execute(data);

      return c.json(result, 201);
    },
  );

  findAll = factory.createHandlers(async (c) => {
    const userId = c.get("userId");
    const result = await this.getAllAccountsUseCase.execute(userId);

    return c.json(result, 200);
  });
}

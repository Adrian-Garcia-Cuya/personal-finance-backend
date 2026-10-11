import type { CreateAccountUseCase } from "@/application/useCases/account/create-account.use-case";
import type { Context } from "hono";
import type { CreateAccountInput } from "../../schemas/account/create-account.schema";
import type { GetAllAccountsUseCase } from "@/application/useCases/account/get-all-accounts.use-case";

export class AccountController {
  constructor(
    private accountUseCase: CreateAccountUseCase,
    private getAllAccountsUseCase: GetAllAccountsUseCase,
  ) {}

  create = async (c: Context) => {
    const body = c.req.valid("json" as never) as CreateAccountInput;
    const userId = c.get("userId") as string;

    const data = {
      ...body,
      userId,
    };
    const result = await this.accountUseCase.execute(data);

    return c.json(result, 201);
  };

  findAll = async (c: Context) => {
    const userId = c.get("userId") as string;
    const result = await this.getAllAccountsUseCase.execute(userId);

    return c.json(result, 200);
  };
}

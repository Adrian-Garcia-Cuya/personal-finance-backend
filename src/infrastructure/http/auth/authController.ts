import type { Context } from "hono";
import { RegisterUseCase } from "../../../application/useCases/auth/register.useCase";
import type { RegisterSchema } from "../schemas/auth/register.schema";
import type { LoginSchema } from "../schemas/auth/login.schema";
import { LoginUseCase } from "../../../application/useCases/auth/login.useCase";

class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  login = async (c: Context) => {
    const body = c.req.valid("json" as never) as LoginSchema;

    const result = await this.loginUseCase.execute(body);

    return c.json(result, 200);
  };

  register = async (c: Context) => {
    const body = c.req.valid("json" as never) as RegisterSchema;

    const result = await this.registerUseCase.execute(body);

    return c.json(result, 201);
  };
}

export default AuthController;

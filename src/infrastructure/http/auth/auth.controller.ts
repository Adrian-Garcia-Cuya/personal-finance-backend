import { LoginSchema } from "../schemas/auth/login.schema";
import { RegisterSchema } from "../schemas/auth/register.schema";
import { factory } from "../factory";
import { schemaValidator } from "../middlewares/schema-validator.middleware";
import type { LoginUseCase } from "../../../application/useCases/auth/login.use-case";
import type { RegisterUseCase } from "../../../application/useCases/auth/register.use-case";

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  login = factory.createHandlers(
    schemaValidator("json", LoginSchema),
    async (c) => {
      const body = c.req.valid("json");

      const result = await this.loginUseCase.execute(body);

      return c.json(result, 200);
    },
  );

  register = factory.createHandlers(
    schemaValidator("json", RegisterSchema),
    async (c) => {
      const body = c.req.valid("json");

      const result = await this.registerUseCase.execute(body);

      return c.json(result, 201);
    },
  );
}

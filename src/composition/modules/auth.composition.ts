import { LoginUseCase } from "@/application/useCases/auth/login.use-case";
import { RegisterUseCase } from "@/application/useCases/auth/register.use-case";
import { BycriptPasswordHasher } from "@/infrastructure/adapters/bycriptPasswordHasher";
import { jwtTokenGenerator } from "@/infrastructure/adapters/jwtTokenGenerator";
import { UserDatasourceImpl } from "@/infrastructure/datasources/user.datasource.impl";
import { AuthController } from "@/infrastructure/http/auth/auth.controller";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository.impl";
import type { IdGenerator } from "@/application/ports/idGenerator";

export const buildAuthComposition = (deps: { uuidGenerator: IdGenerator }) => {
  const datasource = new UserDatasourceImpl();
  const repository = new UserRepositoryImpl(datasource);
  const passwordHasher = new BycriptPasswordHasher();

  const loginUseCase = new LoginUseCase(
    repository,
    passwordHasher,
    jwtTokenGenerator,
  );
  const registerUseCase = new RegisterUseCase(
    repository,
    passwordHasher,
    jwtTokenGenerator,
    deps.uuidGenerator,
  );

  return new AuthController(loginUseCase, registerUseCase);
};

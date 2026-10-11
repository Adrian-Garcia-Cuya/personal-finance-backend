import { CreateAccountUseCase } from "@/application/useCases/account/create-account.use-case";
import { GetAllAccountsUseCase } from "@/application/useCases/account/get-all-accounts.use-case";
import { AccountDatasourceImpl } from "@/infrastructure/datasources/account.datasource.impl";
import { AccountController } from "@/infrastructure/http/modules/account/account.controller";
import { AccountRepositoryImpl } from "@/infrastructure/repositories/account.repository.impl";
import type { IdGenerator } from "@application/ports/idGenerator";

export const buildAccountComposition = (deps: {
  uuidGenerator: IdGenerator;
}) => {
  const datasource = new AccountDatasourceImpl();
  const repository = new AccountRepositoryImpl(datasource);
  const createAccountUseCase = new CreateAccountUseCase(
    repository,
    deps.uuidGenerator,
  );
  const getAllAccountsUseCase = new GetAllAccountsUseCase(repository);

  return new AccountController(createAccountUseCase, getAllAccountsUseCase);
};

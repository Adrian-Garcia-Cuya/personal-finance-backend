import { GetRegistrationFormUseCase } from "@/application/useCases/transaction/get-registration-form.use-case";
import { AccountDatasourceImpl } from "@/infrastructure/datasources/account.datasource.impl";
import { CategoryDatasourceImpl } from "@/infrastructure/datasources/category.datasource.impl";
import { TagDatasourceImpl } from "@/infrastructure/datasources/tag.datasource.impl";
import { TransactionController } from "@/infrastructure/http/modules/transaction/transaction.controller";
import { AccountRepositoryImpl } from "@/infrastructure/repositories/account.repository.impl";
import { CategoryRepositoryImpl } from "@/infrastructure/repositories/category.repository.impl";
import { TagRepositoryImpl } from "@/infrastructure/repositories/tag.repository.impl";

export const buildTransactionComposition = () => {
  const categoryDatasource = new CategoryDatasourceImpl();
  const accountDatasource = new AccountDatasourceImpl();
  const tagDatasource = new TagDatasourceImpl();
  const categoryRepository = new CategoryRepositoryImpl(categoryDatasource);
  const accountRepository = new AccountRepositoryImpl(accountDatasource);
  const tagRepository = new TagRepositoryImpl(tagDatasource);

  const getRegistrationFormUseCase = new GetRegistrationFormUseCase(
    categoryRepository,
    accountRepository,
    tagRepository,
  );

  return new TransactionController(getRegistrationFormUseCase);
};

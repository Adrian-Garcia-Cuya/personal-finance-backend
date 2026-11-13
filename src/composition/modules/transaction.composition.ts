import type { IdGenerator } from "@/application/ports/idGenerator";
import { CreateTransactionUseCase } from "@/application/useCases/transaction/create-transaction.use-case";
import { GetAllTransactionsUseCase } from "@/application/useCases/transaction/get-all-transactions.use-case";
import { GetTransactionSummaryUseCase } from "@/application/useCases/transaction/get-transaction-summary.use-case";
import { TransactionDatasourceImpl } from "@/infrastructure/datasources/transaction.datasource.impl";
import { TransactionRepositoryImpl } from "@/infrastructure/repositories/transaction.repository.impl";
import { PrismaTransactionQuery } from "@/infrastructure/queries/prisma-transaction.query";
import { GetRegistrationFormUseCase } from "@/application/useCases/transaction/get-registration-form.use-case";
import { AccountDatasourceImpl } from "@/infrastructure/datasources/account.datasource.impl";
import { CategoryDatasourceImpl } from "@/infrastructure/datasources/category.datasource.impl";
import { TagDatasourceImpl } from "@/infrastructure/datasources/tag.datasource.impl";
import { TransactionController } from "@/infrastructure/http/modules/transaction/transaction.controller";
import { AccountRepositoryImpl } from "@/infrastructure/repositories/account.repository.impl";
import { CategoryRepositoryImpl } from "@/infrastructure/repositories/category.repository.impl";
import { TagRepositoryImpl } from "@/infrastructure/repositories/tag.repository.impl";

export const buildTransactionComposition = (deps: {
  uuidGenerator: IdGenerator;
}) => {
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

  const transactionDatasource = new TransactionDatasourceImpl();
  const transactionRepository = new TransactionRepositoryImpl(
    transactionDatasource,
  );
  const transactionQuery = new PrismaTransactionQuery();
  const getAllTransactionsUseCase = new GetAllTransactionsUseCase(
    transactionQuery,
  );
  const getTransactionSummaryUseCase = new GetTransactionSummaryUseCase(
    transactionQuery,
  );
  const createTransactionUseCase = new CreateTransactionUseCase(
    deps.uuidGenerator,
    transactionRepository,
    tagRepository,
  );

  return new TransactionController(
    getRegistrationFormUseCase,
    createTransactionUseCase,
    getAllTransactionsUseCase,
    getTransactionSummaryUseCase,
  );
};

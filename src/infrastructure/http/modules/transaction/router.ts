import { Hono } from "hono";

import { AccountDatasourceImpl } from "@/infrastructure/datasources/account.datasource.impl";
import { CategoryDatasourceImpl } from "@/infrastructure/datasources/category.datasource.impl";
import { TagDatasourceImpl } from "@/infrastructure/datasources/tag.datasource.impl";
import { TagRepositoryImpl } from "@/infrastructure/repositories/tag.repository.impl";
import { CategoryRepositoryImpl } from "@/infrastructure/repositories/category.repository.impl";
import { AccountRepositoryImpl } from "@/infrastructure/repositories/account.repository.impl";
import { GetRegistrationFormUseCase } from "@/application/useCases/transaction/get-registration-form.use-case";
import { TransactionController } from "./transaction.controller";

export const transactionRouter = new Hono();

const tagDatasource = new TagDatasourceImpl();
const categoryDatasource = new CategoryDatasourceImpl();
const accountDatasource = new AccountDatasourceImpl();
const tagRepository = new TagRepositoryImpl(tagDatasource);
const categoryRepository = new CategoryRepositoryImpl(categoryDatasource);
const accountRepository = new AccountRepositoryImpl(accountDatasource);

const getRegistrationFormUseCase = new GetRegistrationFormUseCase(
  categoryRepository,
  accountRepository,
  tagRepository,
);
const controller = new TransactionController(getRegistrationFormUseCase);

transactionRouter.get("/registration-form", controller.getFormData);

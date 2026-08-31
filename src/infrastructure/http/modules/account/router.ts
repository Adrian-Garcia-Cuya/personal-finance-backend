import { Hono } from "hono";
import { CreateAccountUseCase } from "@/application/useCases/account/create-account.use-case";
import { GetAllAccountsUseCase } from "@/application/useCases/account/get-all-accounts.use-case";
import { AccountDatasourceImpl } from "@/infrastructure/datasources/account.datasource.impl";
import { AccountRepositoryImpl } from "@/infrastructure/repositories/account.repository.impl";

import { AccountController } from "./account.controller";
import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import { CreateAccountSchema } from "../../schemas/account/create-account.schema";

export const accountRouter = new Hono();

const datasource = new AccountDatasourceImpl();
const repository = new AccountRepositoryImpl(datasource);
const createAccountUseCase = new CreateAccountUseCase(repository);
const getAllAccountsUseCase = new GetAllAccountsUseCase(repository);
const controller = new AccountController(
  createAccountUseCase,
  getAllAccountsUseCase,
);

accountRouter.post(
  "/",
  schemaValidator("json", CreateAccountSchema),
  controller.create,
);

accountRouter.get("/", controller.findAll);

import { Hono } from "hono";
import { CreateCategoryUseCase } from "@/application/useCases/category/create-category.use-case";
import { GetAllCategoriesUseCase } from "@/application/useCases/category/get-all-categories.use-case";
import { CategoryDatasourceImpl } from "@/infrastructure/datasources/category.datasource.impl";
import { CategoryRepositoryImpl } from "@/infrastructure/repositories/category.repository.impl";

import { CategoryController } from "./category.controller";
import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import { CreateCategorySchema } from "../../schemas/category/create-category.schema";

export const categoryRouter = new Hono();

const datasource = new CategoryDatasourceImpl();
const repository = new CategoryRepositoryImpl(datasource);
const createCategoryUseCase = new CreateCategoryUseCase(repository);
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(repository);
const controller = new CategoryController(
  createCategoryUseCase,
  getAllCategoriesUseCase,
);

categoryRouter.post(
  "/",
  schemaValidator("json", CreateCategorySchema),
  controller.create,
);

categoryRouter.get("/", controller.findAll);

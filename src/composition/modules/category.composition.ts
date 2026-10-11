import { CreateCategoryUseCase } from "@/application/useCases/category/create-category.use-case";
import { GetAllCategoriesUseCase } from "@/application/useCases/category/get-all-categories.use-case";
import { CategoryDatasourceImpl } from "@/infrastructure/datasources/category.datasource.impl";
import { CategoryController } from "@/infrastructure/http/modules/category/category.controller";
import { CategoryRepositoryImpl } from "@/infrastructure/repositories/category.repository.impl";
import type { IdGenerator } from "@/application/ports/idGenerator";

export const buildCategoryComposition = (deps: {
  uuidGenerator: IdGenerator;
}) => {
  const datasource = new CategoryDatasourceImpl();
  const repository = new CategoryRepositoryImpl(datasource);
  const createCategoryUseCase = new CreateCategoryUseCase(
    repository,
    deps.uuidGenerator,
  );
  const getAllCategoriesUseCase = new GetAllCategoriesUseCase(repository);

  return new CategoryController(createCategoryUseCase, getAllCategoriesUseCase);
};

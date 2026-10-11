import { CreateTagUseCase } from "@/application/useCases/tag/create-tag.use-case";
import { GetAllTagsUseCase } from "@/application/useCases/tag/get-all-tag.use-case";
import { TagDatasourceImpl } from "@/infrastructure/datasources/tag.datasource.impl";
import { TagController } from "@/infrastructure/http/modules/tag/tag.controller";
import { TagRepositoryImpl } from "@/infrastructure/repositories/tag.repository.impl";
import type { IdGenerator } from "@/application/ports/idGenerator";

export const buildTagComposition = (deps: { uuidGenerator: IdGenerator }) => {
  const datasource = new TagDatasourceImpl();
  const repository = new TagRepositoryImpl(datasource);
  const createTagUseCase = new CreateTagUseCase(repository, deps.uuidGenerator);
  const getAllTagsUseCase = new GetAllTagsUseCase(repository);

  return new TagController(createTagUseCase, getAllTagsUseCase);
};

import { Hono } from "hono";

import { TagRepositoryImpl } from "@/infrastructure/repositories/tag.repository.impl";
import { TagDatasourceImpl } from "@/infrastructure/datasources/tag.datasource.impl";
import { UuidGenerator } from "@/infrastructure/adapters/uuidGenerator";
import { CreateTagUseCase } from "@/application/useCases/tag/create-tag.use-case";
import { GetAllTagsUseCase } from "@/application/useCases/tag/get-all-tag.use-case";

import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import { CreateTagSchema } from "../../schemas/tag/create-tag.schema";
import { TagController } from "./tag.controller";

export const tagRouter = new Hono();

const datasource = new TagDatasourceImpl();
const repository = new TagRepositoryImpl(datasource);
const uuidGenerator = new UuidGenerator();
const createTagUseCase = new CreateTagUseCase(repository, uuidGenerator);
const getAllTagsUseCase = new GetAllTagsUseCase(repository);
const controller = new TagController(createTagUseCase, getAllTagsUseCase);

tagRouter.post(
  "/",
  schemaValidator("json", CreateTagSchema),
  controller.create,
);

tagRouter.get("/", controller.findAll);

import { CreateTagSchema } from "../../schemas/tag/create-tag.schema";
import { factory } from "../../factory";
import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import type { CreateTagUseCase } from "@/application/useCases/tag/create-tag.use-case";
import type { GetAllTagsUseCase } from "@/application/useCases/tag/get-all-tag.use-case";

export class TagController {
  constructor(
    private createTagUseCase: CreateTagUseCase,
    private getAllTagsUseCase: GetAllTagsUseCase,
  ) {}

  create = factory.createHandlers(
    schemaValidator("json", CreateTagSchema),
    async (c) => {
      const body = c.req.valid("json");
      const userId = c.get("userId");

      const result = await this.createTagUseCase.create({
        ...body,
        userId,
      });

      return c.json(result, 201);
    },
  );

  findAll = factory.createHandlers(async (c) => {
    const userId = c.get("userId");
    const result = await this.getAllTagsUseCase.execute(userId);

    return c.json(result, 200);
  });
}

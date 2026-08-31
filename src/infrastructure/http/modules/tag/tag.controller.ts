import type { Context } from "hono";

import type { CreateTagUseCase } from "@/application/useCases/tag/create-tag.use-case";
import type { GetAllTagsUseCase } from "@/application/useCases/tag/get-all-tag.use-case";
import type { CreateTagSchema } from "../../schemas/tag/create-tag.schema";

export class TagController {
  constructor(
    private createTagUseCase: CreateTagUseCase,
    private getAllTagsUseCase: GetAllTagsUseCase,
  ) {}

  create = async (c: Context) => {
    const body = c.req.valid("json" as never) as CreateTagSchema;
    const userId = c.get("userId") as string;

    const result = await this.createTagUseCase.create({
      ...body,
      userId: Number(userId),
    });

    return c.json(result, 201);
  };

  findAll = async (c: Context) => {
    const userId = c.get("userId") as string;
    const result = await this.getAllTagsUseCase.execute(Number(userId));

    return c.json(result, 200);
  };
}

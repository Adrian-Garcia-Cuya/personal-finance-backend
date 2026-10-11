import type { Context } from "hono";

import type { CreateTagUseCase } from "@/application/useCases/tag/create-tag.use-case";
import type { GetAllTagsUseCase } from "@/application/useCases/tag/get-all-tag.use-case";
import type { CreateTagInput } from "../../schemas/tag/create-tag.schema";

export class TagController {
  constructor(
    private createTagUseCase: CreateTagUseCase,
    private getAllTagsUseCase: GetAllTagsUseCase,
  ) {}

  create = async (c: Context) => {
    const body = c.req.valid("json" as never) as CreateTagInput;
    const userId = c.get("userId") as string;

    const result = await this.createTagUseCase.create({
      ...body,
      userId,
    });

    return c.json(result, 201);
  };

  findAll = async (c: Context) => {
    const userId = c.get("userId") as string;
    const result = await this.getAllTagsUseCase.execute(userId);

    return c.json(result, 200);
  };
}

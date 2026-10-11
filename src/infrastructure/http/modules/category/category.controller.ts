import type { Context } from "hono";

import type { CreateCategoryUseCase } from "@/application/useCases/category/create-category.use-case";
import type { GetAllCategoriesUseCase } from "@/application/useCases/category/get-all-categories.use-case";
import type { CreateCategoryInput } from "../../schemas/category/create-category.schema";

export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  create = async (c: Context) => {
    const body = c.req.valid("json" as never) as CreateCategoryInput;
    const userId = c.get("userId") as string;

    const result = await this.createCategoryUseCase.create({
      ...body,
      userId,
    });

    return c.json(result, 201);
  };

  findAll = async (c: Context) => {
    const userId = c.get("userId") as string;
    const result = await this.getAllCategoriesUseCase.execute(userId);

    return c.json(result, 200);
  };
}

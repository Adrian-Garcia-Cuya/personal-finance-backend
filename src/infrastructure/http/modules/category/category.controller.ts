import { CreateCategorySchema } from "../../schemas/category/create-category.schema";
import { factory } from "../../factory";
import { schemaValidator } from "../../middlewares/schema-validator.middleware";
import type { CreateCategoryUseCase } from "@/application/useCases/category/create-category.use-case";
import type { GetAllCategoriesUseCase } from "@/application/useCases/category/get-all-categories.use-case";

export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  create = factory.createHandlers(
    schemaValidator("json", CreateCategorySchema),
    async (c) => {
      const body = c.req.valid("json");
      const userId = c.get("userId");

      const result = await this.createCategoryUseCase.create({
        ...body,
        userId,
      });

      return c.json(result, 201);
    },
  );

  findAll = factory.createHandlers(async (c) => {
    const userId = c.get("userId");
    const result = await this.getAllCategoriesUseCase.execute(userId);

    return c.json(result, 200);
  });
}

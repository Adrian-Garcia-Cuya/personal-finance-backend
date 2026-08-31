import type { CreateCategoryDTO } from "../dtos";
import type { CategoryEntity } from "../entities";

export abstract class CategoryRepository {
  abstract create(
    createCategoryDto: CreateCategoryDTO,
  ): Promise<CategoryEntity>;

  abstract findAll(userId: number): Promise<CategoryEntity[]>;
}

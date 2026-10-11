import type { CategoryEntity } from "../entities";

export abstract class CategoryRepository {
  abstract create(category: CategoryEntity): Promise<CategoryEntity>;

  abstract findAll(userId: string): Promise<CategoryEntity[]>;
}

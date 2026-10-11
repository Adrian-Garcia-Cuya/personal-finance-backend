import type { CategoryEntity } from "../entities";

export abstract class CategoryDatasource {
  abstract create(category: CategoryEntity): Promise<CategoryEntity>;

  abstract findAll(userId: string): Promise<CategoryEntity[]>;
}

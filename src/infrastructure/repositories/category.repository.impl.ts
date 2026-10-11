import type { CategoryDatasource } from "@/domain/datasources";
import type { CategoryEntity } from "@domain/entities";
import type { CategoryRepository } from "@domain/repositories";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDatasource) {}

  create(category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryDatasource.create(category);
  }

  findAll(userId: string): Promise<CategoryEntity[]> {
    return this.categoryDatasource.findAll(userId);
  }
}

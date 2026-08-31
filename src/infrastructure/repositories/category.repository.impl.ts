import type { CategoryDatasource } from "@/domain/datasources";
import type { CreateCategoryDTO } from "@domain/dtos";
import type { CategoryEntity } from "@domain/entities";
import type { CategoryRepository } from "@domain/repositories";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDatasource) {}

  create(createCategoryDto: CreateCategoryDTO): Promise<CategoryEntity> {
    return this.categoryDatasource.create(createCategoryDto);
  }

  findAll(userId: number): Promise<CategoryEntity[]> {
    return this.categoryDatasource.findAll(userId);
  }
}

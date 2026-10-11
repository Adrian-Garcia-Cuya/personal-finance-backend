import type { IdGenerator } from "@/application/ports/idGenerator";
import type { CreateCategoryDTO } from "@/application/dtos/category/create-category.dto";
import { CategoryEntity } from "@/domain/entities";
import type { CategoryRepository } from "@/domain/repositories";

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private idGenerator: IdGenerator,
  ) {}

  async create(data: CreateCategoryDTO) {
    const category = new CategoryEntity(
      this.idGenerator.generate(),
      data.name,
      data.type,
      data.icon,
      true,
      data.userId,
      data.parentId,
      data.description,
      data.color,
    );

    await this.categoryRepository.create(category);

    return {
      success: true,
      message: "Category created successfully",
    };
  }

  async findAll(userId: string) {
    return this.categoryRepository.findAll(userId);
  }
}

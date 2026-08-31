import type { CreateCategoryDTO } from "@/domain/dtos/category/create-category.dto";
import type { CategoryRepository } from "@/domain/repositories";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(data: CreateCategoryDTO) {
    await this.categoryRepository.create(data);

    return {
      success: true,
      message: "Category created successfully",
    };
  }

  async findAll(userId: number) {
    return this.categoryRepository.findAll(userId);
  }
}

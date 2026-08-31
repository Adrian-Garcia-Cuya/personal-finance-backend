import type { CategoryRepository } from "@/domain/repositories";

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(userId: number) {
    return await this.categoryRepository.findAll(userId);
  }
}

import type { CategoryRepository } from "@/domain/repositories";

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(userId: string) {
    return await this.categoryRepository.findAll(userId);
  }
}

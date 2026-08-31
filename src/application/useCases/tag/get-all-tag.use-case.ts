import type { TagRepository } from "@/domain/repositories";

export class GetAllTagsUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(userId: number) {
    return await this.tagRepository.findAll(userId);
  }
}

import type { CreateTagDTO } from "@/domain/dtos/tag/create-tag.dto";
import type { TagRepository } from "@/domain/repositories";

export class CreateTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async create(data: CreateTagDTO) {
    await this.tagRepository.create(data);

    return {
      success: true,
      message: "Tag created successfully",
    };
  }

  async findAll(userId: number) {
    return this.tagRepository.findAll(userId);
  }
}

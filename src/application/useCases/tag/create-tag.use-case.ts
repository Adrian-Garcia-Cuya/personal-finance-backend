import type { IdGenerator } from "@/application/ports/idGenerator";
import type { CreateTagDTO } from "@/application/dtos/tag/create-tag.dto";
import { TagEntity } from "@/domain/entities";
import type { TagRepository } from "@/domain/repositories";

export class CreateTagUseCase {
  constructor(
    private tagRepository: TagRepository,
    private idGenerator: IdGenerator,
  ) {}

  async create(data: CreateTagDTO) {
    const tag = new TagEntity(
      this.idGenerator.generate(),
      data.userId,
      data.name,
      true,
    );

    await this.tagRepository.create(tag);

    return {
      success: true,
      message: "Tag created successfully",
    };
  }

  async findAll(userId: string) {
    return this.tagRepository.findAll(userId);
  }
}

import type { TagDatasource } from "@/domain/datasources";
import type { CreateTagDTO } from "@domain/dtos";
import type { TagEntity } from "@domain/entities";
import type { TagRepository } from "@domain/repositories";

export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly tagDatasource: TagDatasource) {}

  create(createTagDto: CreateTagDTO): Promise<TagEntity> {
    return this.tagDatasource.create(createTagDto);
  }

  findAll(userId: number): Promise<TagEntity[]> {
    return this.tagDatasource.findAll(userId);
  }
}

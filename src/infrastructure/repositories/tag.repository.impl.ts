import type { TagDatasource } from "@/domain/datasources";
import type { TagEntity } from "@domain/entities";
import type { TagRepository } from "@domain/repositories";

export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly tagDatasource: TagDatasource) {}

  create(tag: TagEntity): Promise<TagEntity> {
    return this.tagDatasource.create(tag);
  }

  findAll(userId: string): Promise<TagEntity[]> {
    return this.tagDatasource.findAll(userId);
  }

  findByIds(ids: string[], userId: string): Promise<TagEntity[]> {
    return this.tagDatasource.findByIds(ids, userId);
  }
}

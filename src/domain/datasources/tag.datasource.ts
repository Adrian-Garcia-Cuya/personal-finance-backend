import type { TagEntity } from "../entities";

export abstract class TagDatasource {
  abstract create(tag: TagEntity): Promise<TagEntity>;

  abstract findAll(userId: string): Promise<TagEntity[]>;

  abstract findByIds(ids: string[], userId: string): Promise<TagEntity[]>;
}

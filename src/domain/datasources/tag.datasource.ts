import type { CreateTagDTO } from "../dtos";
import type { TagEntity } from "../entities";

export abstract class TagDatasource {
  abstract create(createTagDto: CreateTagDTO): Promise<TagEntity>;

  abstract findAll(userId: number): Promise<TagEntity[]>;
}

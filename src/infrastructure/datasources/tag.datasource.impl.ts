import type { CreateTagDTO } from "@domain/dtos";
import type { TagDatasource } from "@domain/datasources";
import { TagEntity } from "@domain/entities";
import { prisma } from "../database/prisma";

export class TagDatasourceImpl implements TagDatasource {
  async create(createTagDto: CreateTagDTO): Promise<TagEntity> {
    const tag = await prisma.tag.create({
      data: createTagDto,
    });
    return TagEntity.fromObject(tag);
  }

  async findAll(userId: number): Promise<TagEntity[]> {
    const tags = await prisma.tag.findMany({
      where: {
        status: true,
        deletedAt: null,
        OR: [{ userId: userId }, { userId: null }],
      },
    });

    return tags.map((tag) => TagEntity.fromObject(tag));
  }
}

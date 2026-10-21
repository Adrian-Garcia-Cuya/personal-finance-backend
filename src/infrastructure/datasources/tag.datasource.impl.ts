import type { TagDatasource } from "@domain/datasources";
import { TagEntity } from "@domain/entities";
import { prisma } from "../database/prisma";

export class TagDatasourceImpl implements TagDatasource {
  async create(tag: TagEntity): Promise<TagEntity> {
    await prisma.tag.create({
      data: tag.toPersistence(),
    });

    return tag;
  }

  async findByIds(ids: string[], userId: string): Promise<TagEntity[]> {
    const tags = await prisma.tag.findMany({
      where: {
        id: { in: ids },
        status: true,
        deletedAt: null,
        userId: userId,
      },
    });

    return tags.map(
      (tag) => new TagEntity(tag.id, tag.userId, tag.name, tag.status),
    );
  }

  async findAll(userId: string): Promise<TagEntity[]> {
    const tags = await prisma.tag.findMany({
      where: {
        status: true,
        deletedAt: null,
        OR: [{ userId: userId }, { userId: null }],
      },
    });

    return tags.map(
      (tag) => new TagEntity(tag.id, tag.userId, tag.name, tag.status),
    );
  }
}

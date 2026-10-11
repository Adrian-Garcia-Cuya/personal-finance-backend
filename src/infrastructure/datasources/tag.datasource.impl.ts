import type { TagDatasource } from "@domain/datasources";
import { TagEntity } from "@domain/entities";
import { prisma } from "../database/prisma";

export class TagDatasourceImpl implements TagDatasource {
  async create(tag: TagEntity): Promise<TagEntity> {
    const created = await prisma.tag.create({
      data: {
        id: tag.id,
        name: tag.name,
        status: tag.status,
        user: tag.userId ? { connect: { id: tag.userId } } : undefined,
      },
    });

    return TagEntity.fromObject(created);
  }

  async findAll(userId: string): Promise<TagEntity[]> {
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

import type { CategoryDatasource } from "@/domain/datasources";
import { CategoryEntity } from "@/domain/entities";
import { prisma } from "../database/prisma";
import type { CategoryType } from "@generated/prisma/enums";

export class CategoryDatasourceImpl implements CategoryDatasource {
  async create(category: CategoryEntity): Promise<CategoryEntity> {
    const created = await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        type: category.type as unknown as CategoryType,
        icon: category.icon,
        description: category.description,
        color: category.color,
        status: category.status,
        user: category.userId
          ? { connect: { id: category.userId } }
          : undefined,
        parent: category.parentId
          ? { connect: { id: category.parentId } }
          : undefined,
      },
    });

    return CategoryEntity.fromObject(created);
  }

  async findAll(userId: string): Promise<CategoryEntity[]> {
    const categories = await prisma.category.findMany({
      where: {
        status: true,
        deletedAt: null,
        OR: [{ userId: userId }, { userId: null }],
      },
    });
    return categories.map((category) => CategoryEntity.fromObject(category));
  }
}

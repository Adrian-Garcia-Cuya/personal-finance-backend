import type { CategoryDatasource } from "@/domain/datasources";
import { CategoryEntity } from "@/domain/entities";
import { prisma } from "../database/prisma";

export class CategoryDatasourceImpl implements CategoryDatasource {
  async create(category: CategoryEntity): Promise<CategoryEntity> {
    await prisma.category.create({
      data: category.toPersistence(),
    });

    return category;
  }

  async findAll(userId: string): Promise<CategoryEntity[]> {
    const categories = await prisma.category.findMany({
      where: {
        status: true,
        deletedAt: null,
        OR: [{ userId: userId }, { userId: null }],
      },
    });
    return categories.map(
      (category) =>
        new CategoryEntity(
          category.id,
          category.name,
          category.type,
          category.icon,
          category.status,
          category.userId,
          category.parentId,
          category.description,
          category.color,
        ),
    );
  }
}

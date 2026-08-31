import type { CreateCategoryDTO } from "@/domain/dtos";
import type { CategoryDatasource } from "@/domain/datasources";
import { CategoryEntity } from "@/domain/entities";
import { prisma } from "../database/prisma";
import type { CategoryType } from "@generated/prisma/enums";

export class CategoryDatasourceImpl implements CategoryDatasource {
  async create(createCategoryDto: CreateCategoryDTO): Promise<CategoryEntity> {
    const { parentId, userId, ...rest } = createCategoryDto;
    const category = await prisma.category.create({
      data: {
        ...rest,
        type: rest.type as unknown as CategoryType,
        user: { connect: { id: userId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
    });

    return CategoryEntity.fromObject(category);
  }

  async findAll(userId: number): Promise<CategoryEntity[]> {
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

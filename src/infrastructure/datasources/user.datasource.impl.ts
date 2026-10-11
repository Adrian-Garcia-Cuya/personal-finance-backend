import type { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserEntity } from "../../domain/entities/user.entity";
import { prisma } from "../database/prisma";

export class UserDatasourceImpl implements UserDatasource {
  async getByEmail(email: string): Promise<UserEntity> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    return UserEntity.fromObject(user);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const created = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    });

    return UserEntity.fromObject(created);
  }
}

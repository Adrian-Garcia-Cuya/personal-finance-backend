import type { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserEntity } from "../../domain/entities/user.entity";
import { prisma } from "../database/prisma";

export class UserDatasourceImpl implements UserDatasource {
  async getByEmail(email: string): Promise<UserEntity> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    return new UserEntity(
      user.id,
      user.email,
      user.password,
      user.name,
      user.lastName,
    );
  }

  async create(user: UserEntity): Promise<UserEntity> {
    await prisma.user.create({
      data: user.toPersistence(),
    });

    return user;
  }
}

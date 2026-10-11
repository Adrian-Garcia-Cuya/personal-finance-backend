import type { UserRepository } from "../../domain/repositories/user.repository";
import type { UserDatasource } from "../../domain/datasources/user.datasource";
import type { UserEntity } from "../../domain/entities/user.entity";

export class UserRepositoryImpl implements UserRepository {
  constructor(private datasource: UserDatasource) {}

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.datasource.getByEmail(email);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.datasource.create(user);
  }
}

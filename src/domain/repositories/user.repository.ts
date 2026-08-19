import type { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract getByEmail(email: string): Promise<UserEntity>;
  abstract create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity>;
}

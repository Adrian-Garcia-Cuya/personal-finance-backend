import type { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract getByEmail(email: string): Promise<UserEntity>;
  abstract create(user: UserEntity): Promise<UserEntity>;
}

import type { AccountDatasource } from "@/domain/datasources";
import type { AccountEntity } from "@domain/entities";
import type { AccountRepository } from "@domain/repositories";

export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly accountDatasource: AccountDatasource) {}

  create(account: AccountEntity): Promise<AccountEntity> {
    return this.accountDatasource.create(account);
  }

  findAll(userId: string): Promise<AccountEntity[]> {
    return this.accountDatasource.findAll(userId);
  }
}

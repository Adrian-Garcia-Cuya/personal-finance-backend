import type { AccountDatasource } from "@/domain/datasources";
import type { CreateAccountDTO } from "@domain/dtos";
import type { AccountEntity } from "@domain/entities";
import type { AccountRepository } from "@domain/repositories";

export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly accountDatasource: AccountDatasource) {}

  create(createAccountDto: CreateAccountDTO): Promise<AccountEntity> {
    return this.accountDatasource.create(createAccountDto);
  }

  findAll(userId: number): Promise<AccountEntity[]> {
    return this.accountDatasource.findAll(userId);
  }
}

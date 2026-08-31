import type { CreateAccountDTO } from "../dtos";
import type { AccountEntity } from "../entities";

export abstract class AccountDatasource {
  abstract create(createAccountDto: CreateAccountDTO): Promise<AccountEntity>;

  abstract findAll(userId: number): Promise<AccountEntity[]>;
}

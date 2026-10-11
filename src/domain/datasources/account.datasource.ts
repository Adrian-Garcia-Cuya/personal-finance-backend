import type { AccountEntity } from "../entities";

export abstract class AccountDatasource {
  abstract create(account: AccountEntity): Promise<AccountEntity>;

  abstract findAll(userId: string): Promise<AccountEntity[]>;
}

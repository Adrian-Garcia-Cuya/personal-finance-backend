import type { AccountEntity } from "../entities";

export abstract class AccountRepository {
  abstract create(account: AccountEntity): Promise<AccountEntity>;

  abstract findAll(userId: string): Promise<AccountEntity[]>;
}

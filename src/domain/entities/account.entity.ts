export enum AccountType {
  SAVINGS = "savings",
  CASH = "cash",
  CREDIT_CARD = "creditCard",
  DEBIT_CARD = "debitCard",
  INVESTMENT = "investment",
}

export class AccountEntity {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly name: string,
    public readonly accountType: AccountType,
    public readonly initialBalance: number,
    public readonly icon: string,
    public readonly status: boolean,
    public readonly description?: string | null,
    public readonly color?: string | null,
  ) {}
  static fromObject(object: { [key: string]: any }): AccountEntity {
    return new AccountEntity(
      object.id,
      object.userId,
      object.name,
      object.accountType,
      object.initialBalance,
      object.icon,
      object.status,
      object.description,
      object.color,
    );
  }
}

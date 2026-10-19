import type { AccountType } from "./types";

export class AccountEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly accountType: AccountType,
    public readonly initialBalance: number,
    public readonly icon: string,
    public readonly status: boolean,
    public readonly description?: string | null,
    public readonly color?: string | null,
  ) {}

  toPersistence() {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      accountType: this.accountType,
      initialBalance: this.initialBalance,
      icon: this.icon,
      status: this.status,
      description: this.description ?? null,
      color: this.color ?? null,
    };
  }
}

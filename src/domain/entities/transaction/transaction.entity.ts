import type { TransactionType } from "./types";

export class TransactionEntity {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly accountId: string,
    private readonly amount: number,
    private readonly type: TransactionType,
    private readonly transactionDate: Date,
    private readonly categoryId?: string | null,
    private readonly toAccountId?: string | null,
    private readonly description?: string | null,
  ) {}

  toPersistence() {
    return {
      id: this.id,
      userId: this.userId,
      accountId: this.accountId,
      categoryId: this.categoryId ?? null,
      toAccountId: this.toAccountId ?? null,
      type: this.type,
      amount: this.amount,
      transactionDate: this.transactionDate,
      description: this.description ?? null,
    };
  }
}

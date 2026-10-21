import type { TransactionEntity } from "@/domain/entities";

export class TransactionMapper {
  static toPersistence(t: TransactionEntity) {
    return {
      id: t.id,
      userId: t.userId,
      accountId: t.accountId,
      amount: t.amount,
      type: t.type,
      transactionDate: t.transactionDate,
      categoryId: t.categoryId,
      toAccountId: t.toAccountId,
      description: t.description,
    };
  }
}

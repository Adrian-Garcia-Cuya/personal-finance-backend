import type { TransactionType } from "@/domain/entities/transaction/types";

export interface CreateTransactionDTO {
  userId: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  transactionDate: Date;
  categoryId?: string | null;
  toAccountId?: string | null;
  description?: string | null;
}

import type { TransactionType } from "@/domain/entities/transaction/types";

export interface AccountSummaryDTO {
  id: string;
  name: string;
}

export interface CategorySummaryDTO {
  id: string;
  name: string;
}

export interface TagSummaryDTO {
  id: string;
  name: string;
}

export interface TransactionResponseDTO {
  id: string;
  amount: number;
  type: TransactionType;
  transactionDate: string;
  description: string | null;
  account: AccountSummaryDTO;
  toAccount: AccountSummaryDTO | null;
  category: CategorySummaryDTO | null;
  tags: TagSummaryDTO[];
}

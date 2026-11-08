import type { TransactionResponseDTO } from "@/application/dtos/transaction/transaction-response.dto";

export interface TransactionQuery {
  getAll(userId: string): Promise<TransactionResponseDTO[]>;
}

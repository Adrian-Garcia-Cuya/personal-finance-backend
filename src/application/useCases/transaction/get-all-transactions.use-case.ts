import type { TransactionResponseDTO } from "@/application/dtos/transaction/transaction-response.dto";
import type { TransactionPeriodFilter } from "@/application/dtos/transaction/transaction-period-filter.dto";
import type { TransactionQuery } from "@/application/ports/transaction-query";

export class GetAllTransactionsUseCase {
  constructor(private readonly transactionQuery: TransactionQuery) {}

  async execute(
    userId: string,
    period: TransactionPeriodFilter,
  ): Promise<TransactionResponseDTO[]> {
    return this.transactionQuery.getAll(userId, period);
  }
}

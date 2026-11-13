import type { TransactionPeriodFilter } from "@/application/dtos/transaction/transaction-period-filter.dto";
import type { TransactionSummaryDTO } from "@/application/dtos/transaction/transaction-summary.dto";
import type { TransactionQuery } from "@/application/ports/transaction-query";

export class GetTransactionSummaryUseCase {
  constructor(private readonly transactionQuery: TransactionQuery) {}

  async execute(
    userId: string,
    period: TransactionPeriodFilter,
  ): Promise<TransactionSummaryDTO> {
    return this.transactionQuery.getSummary(userId, period);
  }
}

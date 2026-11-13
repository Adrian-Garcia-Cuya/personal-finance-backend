import type { TransactionResponseDTO } from "@/application/dtos/transaction/transaction-response.dto";
import type { TransactionPeriodFilter } from "@/application/dtos/transaction/transaction-period-filter.dto";
import type { TransactionSummaryDTO } from "@/application/dtos/transaction/transaction-summary.dto";

export interface TransactionQuery {
  getAll(
    userId: string,
    period: TransactionPeriodFilter,
  ): Promise<TransactionResponseDTO[]>;

  getSummary(
    userId: string,
    period: TransactionPeriodFilter,
  ): Promise<TransactionSummaryDTO>;
}

import type { TransactionPeriodFilter } from "./transaction-period-filter.dto";

export interface TransactionSummaryDTO {
  period: TransactionPeriodFilter;
  income: number;
  expense: number;
  balance: number;
}

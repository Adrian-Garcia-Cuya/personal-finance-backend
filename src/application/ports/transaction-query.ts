import type { TransactionResponseDTO } from "@/application/dtos/transaction/transaction-response.dto";
import type { TransactionPeriodFilter } from "@/application/dtos/transaction/transaction-period-filter.dto";
import type { TransactionSummaryDTO } from "@/application/dtos/transaction/transaction-summary.dto";

import type { MonthlyIncomeExpenseDTO } from "@/application/dtos/transaction/monthly-income-expense.dto";
import type { CategoryExpenseDTO } from "@/application/dtos/transaction/category-expense.dto";

export interface TransactionQuery {
  getExpensesByCategory(
    userId: string,
    month: string
  ): Promise<CategoryExpenseDTO[]>;

  getMonthlyIncomeExpense(
    userId: string,
    month: string,
  ): Promise<MonthlyIncomeExpenseDTO[]>;
  getAll(
    userId: string,
    period: TransactionPeriodFilter,
  ): Promise<TransactionResponseDTO[]>;

  getSummary(
    userId: string,
    period: TransactionPeriodFilter,
  ): Promise<TransactionSummaryDTO>;
}

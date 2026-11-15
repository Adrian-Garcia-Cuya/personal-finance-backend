import type { MonthlyIncomeExpenseDTO } from "@/application/dtos/transaction/monthly-income-expense.dto";
import type { TransactionQuery } from "@/application/ports/transaction-query";

export class GetMonthlyIncomeExpenseUseCase {
  constructor(private readonly transactionQuery: TransactionQuery) {}

  async execute(userId: string, month: string): Promise<MonthlyIncomeExpenseDTO[]> {
    return this.transactionQuery.getMonthlyIncomeExpense(userId, month);
  }
}

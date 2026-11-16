import type { CategoryExpenseDTO } from "@/application/dtos/transaction/category-expense.dto";
import type { TransactionQuery } from "@/application/ports/transaction-query";

export class GetExpensesByCategoryUseCase {
  constructor(private readonly transactionQuery: TransactionQuery) {}

  async execute(userId: string, month: string): Promise<CategoryExpenseDTO[]> {
    return this.transactionQuery.getExpensesByCategory(userId, month);
  }
}

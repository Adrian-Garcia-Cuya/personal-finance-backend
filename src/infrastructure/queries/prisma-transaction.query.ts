import type { TransactionResponseDTO } from "@/application/dtos/transaction/transaction-response.dto";
import type { CategoryExpenseDTO } from "@/application/dtos/transaction/category-expense.dto";
import type { TransactionPeriodFilter } from "@/application/dtos/transaction/transaction-period-filter.dto";
import type { TransactionSummaryDTO } from "@/application/dtos/transaction/transaction-summary.dto";
import { Prisma } from "../../../generated/prisma/client";
import type { MonthlyIncomeExpenseDTO } from "@/application/dtos/transaction/monthly-income-expense.dto";
import type { TransactionQuery } from "@/application/ports/transaction-query";
import { prisma } from "@/infrastructure/database/prisma";

export class PrismaTransactionQuery implements TransactionQuery {
  async getExpensesByCategory(
    userId: string,
    month: string,
  ): Promise<CategoryExpenseDTO[]> {
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);

    const totals = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        userId,
        deletedAt: null,
        type: "expense",
        categoryId: { not: null },
        transactionDate: { gte: startDate, lt: endDate },
      },
      _sum: { amount: true },
    });

    const amountsByCategory = new Map(
      totals.flatMap(({ categoryId, _sum }) =>
        categoryId === null ? [] : [[categoryId, _sum.amount] as const],
      ),
    );
    if (amountsByCategory.size === 0) return [];

    const categories = await prisma.category.findMany({
      where: { id: { in: [...amountsByCategory.keys()] } },
      select: { id: true, name: true },
    });

    return categories.map((category) => ({
      categoryId: category.id,
      categoryName: category.name,
      amount: amountsByCategory.get(category.id)?.toNumber() ?? 0,
    }));
  }

  async getAll(
    userId: string,
    period: TransactionPeriodFilter,
  ): Promise<TransactionResponseDTO[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        deletedAt: null,
        transactionDate: this.getPeriodDateFilter(period),
      },
      select: {
        id: true,
        amount: true,
        type: true,
        transactionDate: true,
        description: true,
        account: {
          select: {
            id: true,
            name: true,
          },
        },
        toAccount: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        transactionTags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: [{ transactionDate: "desc" }, { id: "desc" }],
    });

    return transactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount.toNumber(),
      type: transaction.type,
      transactionDate: transaction.transactionDate.toISOString().slice(0, 10),
      description: transaction.description,
      account: transaction.account,
      toAccount: transaction.toAccount,
      category: transaction.category,
      tags: transaction.transactionTags.map(({ tag }) => tag),
    }));
  }

  async getSummary(
    userId: string,
    period: TransactionPeriodFilter,
  ): Promise<TransactionSummaryDTO> {
    const totals = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        deletedAt: null,
        transactionDate: this.getPeriodDateFilter(period),
        type: {
          in: ["income", "expense"],
        },
      },
      _sum: {
        amount: true,
      },
    });

    const income =
      totals.find((total) => total.type === "income")?._sum.amount ??
      new Prisma.Decimal(0);
    const expense =
      totals.find((total) => total.type === "expense")?._sum.amount ??
      new Prisma.Decimal(0);

    return {
      period: { from: period.from, to: period.to },
      income: income.toNumber(),
      expense: expense.toNumber(),
      balance: income.minus(expense).toNumber(),
    };
  }

  async getMonthlyIncomeExpense(
    userId: string,
    month: string,
  ): Promise<MonthlyIncomeExpenseDTO[]> {
    const selectedMonth = new Date(`${month}-01T00:00:00.000Z`);
    const startDate = new Date(selectedMonth);
    startDate.setUTCMonth(startDate.getUTCMonth() - 3);
    const endDate = new Date(selectedMonth);
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);

    const totals = await prisma.transaction.groupBy({
      by: ["transactionDate", "type"],
      where: {
        userId,
        deletedAt: null,
        transactionDate: { gte: startDate, lt: endDate },
        type: { in: ["income", "expense"] },
      },
      _sum: { amount: true },
    });

    const monthlyTotals = new Map<string, { income: Prisma.Decimal; expense: Prisma.Decimal }>();
    for (let index = 0; index < 4; index++) {
      const date = new Date(startDate);
      date.setUTCMonth(date.getUTCMonth() + index);
      monthlyTotals.set(date.toISOString().slice(0, 7), {
        income: new Prisma.Decimal(0),
        expense: new Prisma.Decimal(0),
      });
    }

    for (const total of totals) {
      const monthly = monthlyTotals.get(total.transactionDate.toISOString().slice(0, 7));
      if (monthly && (total.type === "income" || total.type === "expense")) {
        monthly[total.type] = monthly[total.type].plus(total._sum.amount ?? 0);
      }
    }

    return Array.from(monthlyTotals, ([month, totals]) => ({
      month,
      income: totals.income.toNumber(),
      expense: totals.expense.toNumber(),
    }));
  }

  private getPeriodDateFilter(period: TransactionPeriodFilter) {
    const startDate = new Date(`${period.from}T00:00:00.000Z`);
    const endDateExclusive = new Date(`${period.to}T00:00:00.000Z`);
    endDateExclusive.setUTCDate(endDateExclusive.getUTCDate() + 1);

    return {
      gte: startDate,
      lt: endDateExclusive,
    };
  }
}

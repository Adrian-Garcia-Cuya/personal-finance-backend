import type { TransactionResponseDTO } from "@/application/dtos/transaction/transaction-response.dto";
import type { TransactionPeriodFilter } from "@/application/dtos/transaction/transaction-period-filter.dto";
import type { TransactionSummaryDTO } from "@/application/dtos/transaction/transaction-summary.dto";
import { Prisma } from "../../../generated/prisma/client";
import type { TransactionQuery } from "@/application/ports/transaction-query";
import { prisma } from "@/infrastructure/database/prisma";

export class PrismaTransactionQuery implements TransactionQuery {
  async getAll(userId: string): Promise<TransactionResponseDTO[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        deletedAt: null,
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

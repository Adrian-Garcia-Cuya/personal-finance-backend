import type { TransactionResponseDTO } from "@/application/dtos/transaction/transaction-response.dto";
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
}

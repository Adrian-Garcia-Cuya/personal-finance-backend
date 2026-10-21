import { prisma } from "../database/prisma";
import { TransactionEntity } from "@/domain/entities";
import type { TransactionDatasource } from "@/domain/datasources/transaction.datasource";
import { TransactionMapper } from "../mappers/transaction.mapper";

export class TransactionDatasourceImpl implements TransactionDatasource {
  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    await prisma.transaction.create({
      data: {
        ...TransactionMapper.toPersistence(transaction),
        transactionTags: {
          create: transaction.getTagIds().map((t) => ({ tagId: t.value })),
        },
      },
    });

    return transaction;
  }
}

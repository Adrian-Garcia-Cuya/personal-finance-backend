import { prisma } from "../database/prisma";
import { TransactionEntity } from "@/domain/entities";
import type { TransactionDatasource } from "@/domain/datasources/transaction.datasource";

export class TransactionDatasourceImpl implements TransactionDatasource {
  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    await prisma.transaction.create({
      data: transaction.toPersistence(),
    });

    return transaction;
  }
}

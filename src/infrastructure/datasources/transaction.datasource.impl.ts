import { prisma } from "../database/prisma";
import type { TransactionDatasource } from "@/domain/datasources/transaction.datasource";
import { TransactionEntity } from "@/domain/entities/transaction/transaction.entity";

export class TransactionDatasourceImpl implements TransactionDatasource {
  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    await prisma.transaction.create({
      data: transaction.toPersistence(),
    });

    return transaction;
  }
}

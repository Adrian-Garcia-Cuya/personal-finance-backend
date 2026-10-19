import type { TransactionDatasource } from "@/domain/datasources/transaction.datasource";
import type { TransactionEntity } from "@/domain/entities/transaction/transaction.entity";
import type { TransactionRepository } from "@/domain/repositories/transaction.repository";

export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(private readonly transactionDatasource: TransactionDatasource) {}

  create(transaction: TransactionEntity): Promise<TransactionEntity> {
    return this.transactionDatasource.create(transaction);
  }
}

import type { TransactionEntity } from "../entities/transaction/transaction.entity";

export abstract class TransactionDatasource {
  abstract create(transaction: TransactionEntity): Promise<TransactionEntity>;
}

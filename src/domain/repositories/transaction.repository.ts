import type { TransactionEntity } from "../entities/transaction/transaction.entity";

export abstract class TransactionRepository {
  abstract create(transaction: TransactionEntity): Promise<TransactionEntity>;
}

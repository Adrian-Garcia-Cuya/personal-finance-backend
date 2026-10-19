import type { TransactionEntity } from "../entities";

export abstract class TransactionRepository {
  abstract create(transaction: TransactionEntity): Promise<TransactionEntity>;
}

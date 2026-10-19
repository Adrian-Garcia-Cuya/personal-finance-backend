import type { TransactionEntity } from "../entities";

export abstract class TransactionDatasource {
  abstract create(transaction: TransactionEntity): Promise<TransactionEntity>;
}

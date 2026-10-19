import { TransactionEntity } from "@/domain/entities";
import type { CreateTransactionDTO } from "@/application/dtos/transaction/create-transaction.dto";
import type { IdGenerator } from "@/application/ports/idGenerator";
import type { TransactionRepository } from "@/domain/repositories/transaction.repository";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(data: CreateTransactionDTO) {
    const transaction = new TransactionEntity(
      this.idGenerator.generate(),
      data.userId,
      data.accountId,
      data.amount,
      data.type,
      data.transactionDate,
      data.categoryId,
      data.toAccountId,
      data.description,
    );

    await this.transactionRepository.create(transaction);

    return {
      success: true,
      message: "Transaction created successfully",
    };
  }
}

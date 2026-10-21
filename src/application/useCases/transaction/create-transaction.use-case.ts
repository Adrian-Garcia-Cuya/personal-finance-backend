import { TransactionEntity } from "@/domain/entities";
import type { CreateTransactionDTO } from "@/application/dtos/transaction/create-transaction.dto";
import type { IdGenerator } from "@/application/ports/idGenerator";
import type { TransactionRepository } from "@/domain/repositories/transaction.repository";
import { TagId } from "@/domain/entities/transaction/valueObjects/tagId.value-object";
import type { TagRepository } from "@/domain/repositories";

export class CreateTransactionUseCase {
  constructor(
    private readonly idGenerator: IdGenerator,
    private readonly transactionRepository: TransactionRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(data: CreateTransactionDTO) {
    const tagIds = (data.tagIds ?? []).map(TagId.create);

    if (tagIds.length) {
      const found = await this.tagRepository.findByIds(
        data.tagIds!,
        data.userId,
      );
      if (found.length !== new Set(data.tagIds).size)
        throw new Error("Se encontraron tags no existentes");
    }

    const transaction = TransactionEntity.create({
      id: this.idGenerator.generate(),
      ...data,
      tagIds,
    });

    await this.transactionRepository.create(transaction);

    return {
      success: true,
      message: "Transaction created successfully",
    };
  }
}

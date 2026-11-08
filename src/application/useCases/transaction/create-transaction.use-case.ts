import { TransactionEntity } from "@/domain/entities";
import { TagId } from "@/domain/entities/transaction/valueObjects/tagId.value-object";
import type { CreateTransactionDTO } from "@/application/dtos/transaction/create-transaction.dto";
import type { IdGenerator } from "@/application/ports/idGenerator";
import type { TransactionRepository } from "@/domain/repositories/transaction.repository";
import type { TagRepository } from "@/domain/repositories";

export class CreateTransactionUseCase {
  constructor(
    private readonly idGenerator: IdGenerator,
    private readonly transactionRepository: TransactionRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(data: CreateTransactionDTO) {
    const rawTagIds = data.tagIds ?? [];
    const tagIds = rawTagIds.map(TagId.create);

    if (tagIds.length) {
      const found = await this.tagRepository.findByIds(rawTagIds, data.userId);
      if (found.length !== new Set(rawTagIds).size)
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

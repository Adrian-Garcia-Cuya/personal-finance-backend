import type { IdGenerator } from "@/application/ports/idGenerator";
import type { CreateAccountDTO } from "@/application/dtos/account/create-account.dto";
import { AccountEntity } from "@/domain/entities";
import type { AccountRepository } from "@/domain/repositories";

export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private idGenerator: IdGenerator,
  ) {}

  async execute(data: CreateAccountDTO) {
    const account = new AccountEntity(
      this.idGenerator.generate(),
      data.userId,
      data.name,
      data.accountType,
      data.initialBalance,
      data.icon,
      true,
      data.description,
      data.color,
    );

    await this.accountRepository.create(account);

    return {
      success: true,
      message: "Account created successfully",
    };
  }
}

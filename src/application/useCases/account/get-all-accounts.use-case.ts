import type { AccountRepository } from "@/domain/repositories";

export class GetAllAccountsUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(userId: number) {
    return await this.accountRepository.findAll(userId);
  }
}
